import {Definition} from "./definition.interface";

export interface Leave {
    target: string | Definition;

    // un seul nodeType de tip pour le moment
    tip?: string;
    errorTip?: string;
}