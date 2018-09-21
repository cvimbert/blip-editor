import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {BlocksComponent} from "./blocks-test/blocks/blocks.component";
import {DropBankEditComponent} from "./blocks-test/drop-bank-edit/drop-bank-edit.component";

const routes: Routes = [
    {
        path: "project/:projectid",
        component: CodeEditorComponent
    },
    {
        path: "blocks",
        component: BlocksComponent
    },
    {
        path: "blocks/:blockId/:typeId",
        component: DropBankEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CodeEditorRoutingModule { }
