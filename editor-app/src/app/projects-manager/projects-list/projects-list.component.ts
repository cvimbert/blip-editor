import { Component, OnInit } from '@angular/core';
import {ProjectsProviderService} from "../projects-provider.service";
import {MatDialog} from "@angular/material";
import {AddProjectModalComponent} from "../add-project-modal/add-project-modal.component";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

    selectedProject: string;

    constructor(
        private projectsProvider: ProjectsProviderService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
      this.projectsProvider.loadProjects();
    }

    get projects(): Observable<string[]> {
        return this.projectsProvider.datasSubject;
    }

    onSelect(selectedProject: string) {
        this.projectsProvider.gotoProject(selectedProject);
    }

    addProject() {
        this.dialog.open(AddProjectModalComponent, {
            width: "400px"
        });
    }
}
