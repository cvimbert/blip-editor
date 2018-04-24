import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CodeFilesProviderService} from "../code-files-provider.service";
import {MatDialog} from "@angular/material";
import {AddCodeFileModalComponent} from "../add-code-file-modal/add-code-file-modal.component";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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

    constructor(
        private codeFilesProvider: CodeFilesProviderService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.codeFilesProvider.loadFiles();

        this.editor = CodeMirror(document.body, {
            lineNumbers: true,
            mode: "blip",
            theme: "ambiance"
        });

        this.codeFilesProvider.datasSubject.take(1).subscribe((data: {[key: string]: string}) => {
            let keys: string[] = Object.keys(data);

            if (keys.length > 0) {
                this.selectedCodeFile = keys[0];
                this.updateEditorContent();
                this.currentFileName = keys[0];
            }
        });
    }

    save() {
        this.codeFilesProvider.datas.files[this.selectedCodeFile] = this.editor.getDoc().getValue();
        this.codeFilesProvider.save();
    }

    deleteCurrent() {

    }

    updateEditorContent() {
        this.editor.getDoc().setValue(this.getCode(this.selectedCodeFile));
    }

    storeCurrent() {
        if (this.currentFileName) {
            this.codeFilesProvider.datas.files[this.currentFileName] = this.editor.getDoc().getValue();
        }
    }

    codeFileChanged(fileName: string) {

        // enregistrement dans le provider
        this.storeCurrent();

        this.updateEditorContent();

        this.currentFileName = fileName;
    }

    get datas(): Observable<string[]> {
        return this.codeFilesProvider.datasSubject.map((data: {[key: string]: string}) => {
            let resp: string[] = [];

            for (let key in data) {
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
        }).afterClosed().subscribe((fileName: string) => {
            if (fileName) {
                this.storeCurrent();
                this.codeFilesProvider.createFile(fileName);
                this.currentFileName = this.selectedCodeFile;
                this.selectedCodeFile = fileName;
                //this.editor.getDoc().setValue("");
            }
        });
    }

}
