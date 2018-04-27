export class TemplatesManager {

    getTemplate(id: string, datas: Object): string {
        let text: string = this.templates[id];

        for (let key in datas) {
            text = text.replace(new RegExp("%" + key + "%", "g"), datas[key]);
        }

        return text;
    }

    private baseSceneWithControls: string = `#scene %NAME%: {

    scale: 0.6
    
    #sprite
    	s1: "../assets/files/game1/sprites/r1p1.png", 20, 20

    #control
        ctrlA: {
            sprite: "../assets/files/controls/buttonA.png", 700, 100
            key: "a"
        }

        cross:  {
            sprite: "../assets/files/controls/cross.png", 685, 266

            #zone
                up: 30, 0, 30, 30, "ArrowUp"
                down: 30, 60, 30, 30, "ArrowDown"
                right: 60, 30, 30, 30, "ArrowRight"
                left: 0, 30, 30, 30, "ArrowLeft"
        }

    #trigger
        leftclick: control(cross_left).down
        rightclick: control(cross_right).down
        upclick: control(cross_up).down
        downclick: control(cross_down).down

    @start {
        sprite s1 > show
    }
}`;


    private baseObject: string = `#instantiable %NAME%: {

    #sprite
        s1: "../assets/files/game1/sprites/r3p2.png", 160, 1038

    @start {
        sprite s1 > show
    }
}`;

    templates: {[key: string]: string} = {
        "baseObject": this.baseObject,
        "baseSceneWithControls": this.baseSceneWithControls
    }
}