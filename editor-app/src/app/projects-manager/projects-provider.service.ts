import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Router} from "@angular/router";

@Injectable()
export class ProjectsProviderService {

    datas: string[];
    datasSubject: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

    constructor(
        private router: Router
    ) { }

    loadProjects() {
        let rawDatas: string = localStorage["projects"];

        if (rawDatas && rawDatas !== "") {
            this.datas = JSON.parse(rawDatas);
        } else {
            this.datas = [];
        }

        this.datasSubject.next(this.datas);
    }

    gotoProject(projectName: string) {
        this.router.navigate(["project", projectName]);
    }

    addProject(projectName: string) {
        if (this.isNameValid(projectName)) {
            this.datas.push(projectName);
        }

        this.datasSubject.next(this.datas);
    }

    isNameValid(projectName: string) {
        let nameStructure: RegExp = /^[A-Za-z0-9_]+$/;
        return this.datas.indexOf(projectName) === -1 && nameStructure.test(projectName);
    }

    save() {
        localStorage["projects"] = JSON.stringify(this.datas);
    }
}
