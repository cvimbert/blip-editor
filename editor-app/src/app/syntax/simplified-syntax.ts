import {SyntaxNodesDictionary} from "./syntax-nodes-dictionary.interface";
import {BlockDefinitionsDictionary} from "./block-definitions-dictionary.interface";

export const simplifiedBlocksDictionary: BlockDefinitionsDictionary = {
    a: {
        text: "a"
    },
    b: {
        text: "b"
    },
    s1: {
        text: "s1"
    },
    s2: {
        text: "s2"
    },
    s3: {
        text: "s3"
    }
};

export const simplifiedDictionary: SyntaxNodesDictionary = {
    Main: {
        list: {
            a1: {
                blockReference: "a"
            },
            s: {
                nodeType: "SB"
            },
            a2: {
                blockReference: "b"
            }
        }
    },
    S: {
        children: {
            s1: {
                nodeType: "S1"
            },
            s2: {
                nodeType: "S2"
            },
            s3: {
                nodeType: "S3"
            }
        }
    },
    S1: {
        blockReference: "s1"
    },
    S2: {
        blockReference: "s2"
    },
    S3: {
        blockReference: "s3"
    },
    SB: {
        list: {
            SB1: {
                blockReference: "s1"
            },
            SB2: {
                blockReference: "s2"
            }
        }
    }
};