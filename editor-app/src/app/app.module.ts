import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CodeEditorModule} from "./code-editor/code-editor.module";
import {ProjectsManagerModule} from "./projects-manager/projects-manager.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CodeEditorModule,
        ProjectsManagerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
