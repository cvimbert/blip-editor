import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CodeEditorModule} from "./code-editor/code-editor.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CodeEditorModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
