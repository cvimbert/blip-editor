import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlocksService} from "../blocks.service";

@Component({
    selector: 'app-drop-bank-edit',
    templateUrl: './drop-bank-edit.component.html',
    styleUrls: ['./drop-bank-edit.component.scss']
})
export class DropBankEditComponent implements OnInit {

    bankName: string;
    bankType: string;

    constructor(
        private route: ActivatedRoute,
        private blocksService: BlocksService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.bankName = params["blockId"];
            this.bankType = params["typeId"];

            this.blocksService.currentBankName = this.bankName;
            this.blocksService.currentBankType = this.bankType;
        });
    }

}
