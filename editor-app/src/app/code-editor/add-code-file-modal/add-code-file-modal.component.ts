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

    constructor(
        private ref: MatDialogRef<AddCodeFileModalComponent>,
        private codeFilesProvider: CodeFilesProviderService
    ) { }

    ngOnInit() {
    }

    validateName() {
        this.ref.close(this.fileName);
    }

    get isNameValid(): boolean {
        return this.codeFilesProvider.isNameValid(this.fileName);
    }
}
