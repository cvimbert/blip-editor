import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsManagerRoutingModule } from './projects-manager-routing.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import {
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSelectModule
} from "@angular/material";
import {ProjectsProviderService} from "./projects-provider.service";
import {FormsModule} from "@angular/forms";
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';

@NgModule({
    imports: [
        CommonModule,
        ProjectsManagerRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule
    ],
    declarations: [
        ProjectsListComponent,
        AddProjectModalComponent
    ],
    providers: [
        ProjectsProviderService
    ],
    entryComponents: [
        AddProjectModalComponent
    ]
})
export class ProjectsManagerModule { }
