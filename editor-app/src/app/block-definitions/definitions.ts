import {Definition} from "./definition.interface";

export const imageFileReference: Definition = {

};

export const testDef: Definition = {
    tip: "t1, suivi de t3, ou t2, ou t3 suivi de t2 optionnel",
    errorTip: "Doit commencer par t1 ou t3",
    children: [
        {
            // Trois types de valeurs possibles :
            // -> référence à une "feuille"
            // -> référence à un array de feuilles (surtout dans un but de simplification des déclarations)
            // -> une définition
            // en gros ici (t1(t2 | t3))|(t3 t2?)
            // et pour résumer
            // -> Ref à une BankItemDefinition (?)
            // -> Ref à un tableau de BankItemDefinition
            // -> Reference à une Definition
            // Attention, ici ce ne sont que des objects, donc différenciation tordue
            target: "t1",
            children: [
                {
                    target: "t2"
                },
                {
                    target: "t3"
                }
            ]
        },
        {
            target: "t3",
            children: [
                {
                    target: "t2",
                    repetition: "?"
                }
            ]
        }
    ]
};

export const spriteDefinition: Definition = {
    tip: "Une image, suivie de la position du sprite sur x et y (axes horizontaux et verticaux)",
    errorTip: "Le premier membre doit être une imageFileReference",
    children: [
        {
            // si target est une string, block direct de ce nodeType
            target: "imageFileReference",
            tip: "Doit être suivi d'un nombre indiquant la position du sprite sur x (axe horizontal)"
        },
        {
            target: "number",
            tip: "Doit être suivi d'un nombre indiquant la position du sprite sur y (axe vertical)"
        },
        {
            target: "number"
        }
    ]
};

export const definitions: {[key: string]: Definition} = {
    spriteDefinition: spriteDefinition
};

