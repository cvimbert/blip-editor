import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {BlocksComponent} from "./blocks-test/blocks/blocks.component";
import {DropBankEditComponent} from "./blocks-test/drop-bank-edit/drop-bank-edit.component";
import {TestComponent} from "./blocks-test/test/test.component";

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
    },
    {
        path: "test",
        component: TestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CodeEditorRoutingModule { }
