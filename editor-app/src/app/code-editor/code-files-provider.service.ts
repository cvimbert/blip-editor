import { Injectable } from '@angular/core';
import {CodeFilesData} from "./code-files-data.interface";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class CodeFilesProviderService {

    datas: CodeFilesData;
    datasSubject: ReplaySubject<{[key: string]: string}> = new ReplaySubject(1);

    projectId: string;

    constructor() { }

    loadFiles() {
        let rawDatas: string = localStorage[this.projectId + "-code-files"];

        if (rawDatas && rawDatas !== "") {
            this.datas = JSON.parse(rawDatas);
            this.datasSubject.next(this.datas.files);
        } else {
            this.datas = {
                files: {}
            };
            this.datasSubject.next(this.datas.files);
        }
    }

    createFile(fileName: string) {
        if (this.isNameValid(fileName)) {
            this.datas.files[fileName] = "";
            this.datasSubject.next(this.datas.files);
            this.save();
        }
    }

    save() {
        localStorage[this.projectId + "-code-files"] = JSON.stringify(this.datas);
    }

    isNameValid(name: string): boolean {
        return this.datas.files[name] === undefined;
    }
}
