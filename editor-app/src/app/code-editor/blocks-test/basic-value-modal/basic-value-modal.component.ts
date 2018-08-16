import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BankItemInterface} from "../bank-item.interface";

@Component({
    selector: 'app-basic-value-modal',
    templateUrl: './basic-value-modal.component.html',
    styleUrls: ['./basic-value-modal.component.scss']
})
export class BasicValueModalComponent implements OnInit {

    blockType: string;
    value: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: BankItemInterface,
        private ref: MatDialogRef<BasicValueModalComponent>
    ) {
        this.blockType = this.data.type;
    }

    ngOnInit() {
    }

    validateValue() {
        this.ref.close(this.value);
    }

}
