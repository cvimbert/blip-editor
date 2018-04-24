import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodeEditorComponent} from "./code-editor/code-editor.component";

const routes: Routes = [
    {
        path: "editor",
        component: CodeEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CodeEditorRoutingModule { }
