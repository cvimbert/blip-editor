import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeEditorRoutingModule } from './code-editor-routing.module';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import {
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSelectModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CodeFilesProviderService} from "./code-files-provider.service";
import { AddCodeFileModalComponent } from './add-code-file-modal/add-code-file-modal.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        CodeEditorRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        FormsModule
    ],
    declarations: [
        CodeEditorComponent,
        AddCodeFileModalComponent
    ],
    providers: [
        CodeFilesProviderService
    ],
    entryComponents: [
        AddCodeFileModalComponent
    ]
})
export class CodeEditorModule { }
