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
import { ParentAutoresizeDirective } from './parent-autoresize.directive';
import { BlocksComponent } from './blocks-test/blocks/blocks.component';
import { BlockItemComponent } from './blocks-test/block-item/block-item.component';
import { ItemsBankComponent } from './blocks-test/items-bank/items-bank.component';
import { BankItemComponent } from './blocks-test/bank-item/bank-item.component';
import { DropBankComponent } from './blocks-test/drop-banks/drop-bank/drop-bank.component';
import {BlocksService} from "./blocks-test/blocks.service";
import { BasicValueModalComponent } from './blocks-test/basic-value-modal/basic-value-modal.component';
import { NumericValueDropBankComponent } from './blocks-test/drop-banks/numeric-value-drop-bank/numeric-value-drop-bank.component';
import { BlocksLineComponent } from './blocks-test/blocks-line/blocks-line.component';
import { VirtualCodeKeyboardComponent } from './blocks-test/virtual-code-keyboard/virtual-code-keyboard.component';
import { DropBankEditComponent } from './blocks-test/drop-bank-edit/drop-bank-edit.component';

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
        AddCodeFileModalComponent,
        ParentAutoresizeDirective,
        BlocksComponent,
        BlockItemComponent,
        ItemsBankComponent,
        BankItemComponent,
        DropBankComponent,
        BasicValueModalComponent,
        NumericValueDropBankComponent,
        BlocksLineComponent,
        VirtualCodeKeyboardComponent,
        DropBankEditComponent
    ],
    providers: [
        CodeFilesProviderService,
        BlocksService
    ],
    entryComponents: [
        AddCodeFileModalComponent,
        BasicValueModalComponent
    ]
})
export class CodeEditorModule { }
