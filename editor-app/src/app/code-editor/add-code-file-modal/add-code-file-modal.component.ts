import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {CodeFilesProviderService} from "../code-files-provider.service";

@Component({
    selector: 'app-add-code-file-modal',
    templateUrl: './add-code-file-modal.component.html',
    styleUrls: ['./add-code-file-modal.component.scss']
})
export class AddCodeFileModalComponent implements OnInit {

    fileName: string = "";
    templateId: string = "none";

    templates: {
        value: string,
        name: string
    }[] = [
        {
            value: "none",
            name: "None"
        },
        {
            value: "baseSceneWithControls",
            name: "Base scene with controls"
        },
        {
            value: "baseObject",
            name: "Base object"
        }
    ];

    constructor(
        private ref: MatDialogRef<AddCodeFileModalComponent>,
        private codeFilesProvider: CodeFilesProviderService
    ) { }

    ngOnInit() {
    }

    validateName() {
        this.ref.close({
            filename: this.fileName,
            templateId: this.templateId
        });
    }

    get isNameValid(): boolean {
        return this.codeFilesProvider.isNameValid(this.fileName);
    }
}
