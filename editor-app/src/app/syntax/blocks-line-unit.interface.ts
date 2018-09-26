import {SyntaxCheckErrorUnit} from "./syntax-check-error-unit.interface";
import {ConsolidatedBlockDataUnit} from "./consolidated-block-data-unit.class";

export interface BlocksLineUnit {
    suggestion?: SyntaxCheckErrorUnit;
    block?: ConsolidatedBlockDataUnit;
}