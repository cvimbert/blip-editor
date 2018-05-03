import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CodeFilesProviderService} from "../code-files-provider.service";
import {MatDialog} from "@angular/material";
import {AddCodeFileModalComponent} from "../add-code-file-modal/add-code-file-modal.component";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {CodeStringsLoader, SceneUnitObject} from "blip-framework";
import {ActivatedRoute, Params} from "@angular/router";
import {TemplatesManager} from "../../templates/templates-manager.class";
import {CodeFilesData} from "../code-files-data.interface";

declare var require: any;
const CodeMirror = require("codemirror/lib/codemirror");
require("../../blip.js");

@Component({
    selector: 'app-code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

    selectedCodeFile: string;
    currentFileName: string;
    editor: any;
    gameScene: SceneUnitObject;
    sceneWidth: number = 0;
    sceneHeight: number = 0;
    @ViewChild("gamezone") gameZone: ElementRef;
    @ViewChild("editorzone") editorZone: ElementRef;

    templatesManager: TemplatesManager = new TemplatesManager();

    constructor(
        private codeFilesProvider: CodeFilesProviderService,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.route.params.subscribe((params: Params) => {
            this.codeFilesProvider.projectId = params["projectid"];

            this.codeFilesProvider.loadFiles();

            this.editor = CodeMirror(this.editorZone.nativeElement, {
                lineNumbers: true,
                mode: "blip",
                theme: "ambiance"
            });

            this.codeFilesProvider.datasSubject.take(1).subscribe((data: CodeFilesData) => {
                let keys: string[] = Object.keys(data.files);
                let codeFiles: string[] = [];

                if (keys.length > 0) {
                    this.selectedCodeFile = keys[0];
                    this.updateEditorContent();
                    this.currentFileName = keys[0];
                }

                keys.forEach((key: string) => {
                    codeFiles.push(data.files[key]);
                });

                let loader: CodeStringsLoader = new CodeStringsLoader(codeFiles, this.gameZone.nativeElement, (scene: SceneUnitObject) => {
                    this.gameScene = scene;
                });

                this.sceneHeight = data.height;
                this.sceneWidth = data.width;
            });
        });
    }

    save() {
        this.codeFilesProvider.save();
    }

    deleteCurrent() {

    }

    updateSceneSize() {
        this.codeFilesProvider.datas.width = this.sceneWidth;
        this.codeFilesProvider.datas.height = this.sceneHeight;
    }

    reload() {
        // empty game zone
        this.gameZone.nativeElement.innerHTML = "";

        this.storeCurrent();

        if (this.gameScene) {
            this.gameScene.destroy();
        }

        this.codeFilesProvider.datasSubject.take(1).subscribe((data: CodeFilesData) => {
            let keys: string[] = Object.keys(data.files);
            let codeFiles: string[] = [];

            keys.forEach((key: string) => {
                codeFiles.push(data.files[key]);
            });

            let loader: CodeStringsLoader = new CodeStringsLoader(codeFiles, this.gameZone.nativeElement, (scene: SceneUnitObject) => {
                this.gameScene = scene;
            });
        });
    }

    updateEditorContent() {
        this.editor.getDoc().setValue(this.getCode(this.selectedCodeFile));
    }

    storePrevious() {
        if (this.currentFileName) {
            this.codeFilesProvider.datas.files[this.currentFileName] = this.editor.getDoc().getValue();
        }

        this.save();
    }

    storeCurrent() {
        if (this.selectedCodeFile) {
            this.codeFilesProvider.datas.files[this.selectedCodeFile] = this.editor.getDoc().getValue();
        }

        this.save();
    }

    codeFileChanged(fileName: string) {

        // enregistrement dans le provider
        this.storePrevious();

        this.updateEditorContent();

        this.currentFileName = fileName;
    }

    get datas(): Observable<string[]> {
        return this.codeFilesProvider.datasSubject.map((data: CodeFilesData) => {
            let resp: string[] = [];

            for (let key in data.files) {
                resp.push(key);
            }

            return resp;
        });
    }

    getCode(fileName: string) {
        return this.codeFilesProvider.datas.files[fileName];
    }

    addCodeFile() {
        this.dialog.open(AddCodeFileModalComponent, {
            width: "400px"
        }).afterClosed().subscribe((result: string) => {
            if (result) {
                this.storeCurrent();
                this.selectedCodeFile = result["filename"];

                let templateStr: string;

                switch (result["templateId"]) {
                    case "none":
                        templateStr = "";
                        break;

                    default:
                        templateStr = this.templatesManager.getTemplate(result["templateId"], {
                            NAME: result["filename"]
                        });
                }

                this.editor.getDoc().setValue(templateStr);
                this.codeFilesProvider.createFile(result["filename"], templateStr);
                this.reload();
                this.currentFileName = this.selectedCodeFile;
            }
        });
    }

}
