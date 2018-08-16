import {Definition} from "./definition.interface";

export const imageFileReference: Definition = {

};

export const spriteDefinition: Definition = {
    tip: "Une image, suivie de la position du sprite sur x et y (axes horizontaux et verticaux)",
    errorTip: "Le premier membre doit être une imageFileReference",
    children: [
        {
            // si targetType est une string, block direct de ce type
            targetType: "imageFileReference",
            tip: "Doit être suivi d'un nombre indiquant la position du sprite sur x (axe horizontal)"
        },
        {
            targetType: "number",
            tip: "Doit être suivi d'un nombre indiquant la position du sprite sur y (axe vertical)"
        },
        {
            targetType: "number"
        }
    ]
};

export const definitions: {[key: string]: Definition} = {
    spriteDefinition: spriteDefinition
};

