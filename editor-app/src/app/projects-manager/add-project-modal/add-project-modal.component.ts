import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {ProjectsProviderService} from "../projects-provider.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-project-modal',
    templateUrl: './add-project-modal.component.html',
    styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit {

    projectName: string;

    constructor(
        private projectProvider: ProjectsProviderService,
        private ref: MatDialogRef<AddProjectModalComponent>
    ) { }

    ngOnInit() {
    }

    validateName() {
        this.projectProvider.addProject(this.projectName);
        this.projectProvider.save();

        this.projectProvider.gotoProject(this.projectName);

        this.ref.close(this.projectName);
    }

    get isNameValid(): boolean {
        return this.projectProvider.isNameValid(this.projectName);
    }

}
