import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import * as THREE from 'three';
import { Globe, Flower, Land, Star } from 'objects';
import { BasicLights } from 'lights';
import POSX from "./textures/Earth/posx.jpg";
import NEGX from "./textures/Earth/negx.jpg";
import POSY from "./textures/Earth/posy.jpg";
import NEGY from "./textures/Earth/negy.jpg";
import POSZ from "./textures/Earth/posz.jpg";
import NEGZ from "./textures/Earth/negz.jpg";

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };
        this.meshes = [];

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);


        // this.background = new THREE.CubeTextureLoader()
		// 	.load( [
        //         POSX, NEGX,
        //         POSY, NEGY,
        //         POSZ, NEGZ
        // ] );

        // Add meshes to scene

        // const land = new Land();
        // const flower = new Flower(this);
        // const lights = new BasicLights();
        // this.add(land, flower, lights);

        // var a = CSG.cube();
        // var b = CSG.sphere({ radius: 1.35, stacks: 12 });
        // var c = CSG.cylinder({ radius: 0.7, start: [-1, 0, 0], end: [1, 0, 0] });
        // var d = CSG.cylinder({ radius: 0.7, start: [0, -1, 0], end: [0, 1, 0] });
        // var e = CSG.cylinder({ radius: 0.7, start: [0, 0, -1], end: [0, 0, 1] });
        
        // this.add(a, b, c, d, e);

        // var cube = new CSG.cube();
        // var sphere = CSG.sphere({radius: 1.3, stacks: 16});
        // var geometry = cube.subtract(sphere);
        // this.add(geometry);

        const lights = new BasicLights();
        this.add(lights);

        const star = new Star(this, 0, 2, 0);
        this.add(star);
        this.meshes.push(star.mesh);

        // const globe = new Globe(this);
        // this.add(globe);

        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
