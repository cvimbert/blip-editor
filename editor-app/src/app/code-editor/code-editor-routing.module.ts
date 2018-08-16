import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {BlocksComponent} from "./blocks-test/blocks/blocks.component";

const routes: Routes = [
    {
        path: "project/:projectid",
        component: CodeEditorComponent
    },
    {
        path: "blocks",
        component: BlocksComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CodeEditorRoutingModule { }
