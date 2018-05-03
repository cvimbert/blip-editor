import { Injectable } from '@angular/core';
import {CodeFilesData} from "./code-files-data.interface";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class CodeFilesProviderService {

    datas: CodeFilesData;
    datasSubject: ReplaySubject<CodeFilesData> = new ReplaySubject(1);

    projectId: string;

    constructor() { }

    loadFiles() {
        let rawDatas: string = localStorage[this.projectId + "-code-files"];

        if (rawDatas && rawDatas !== "") {
            this.datas = JSON.parse(rawDatas);
        } else {
            this.datas = {
                files: {},
                width: 600,
                height: 400
            };
        }

        this.datasSubject.next(this.datas);
    }

    createFile(fileName: string, content: string = "") {
        if (this.isNameValid(fileName)) {
            this.datas.files[fileName] = content;
            this.datasSubject.next(this.datas);
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
