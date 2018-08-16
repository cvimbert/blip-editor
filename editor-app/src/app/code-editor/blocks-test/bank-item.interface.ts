import {BlocksService} from "./blocks.service";

export interface BankItemInterface {
    type: string;
    fontColor: string;
    backgroundColor: string;

    // linebreak ne doit pas être défini ici, mais dans la structure syntaxique
    lineBreak?: boolean;

    valueProvider?: Function;
    textBuilder?: Function;
}