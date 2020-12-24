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

const RED = 0xff8e88;
const ORANGE = 0xfeba4f;
const YELLOW = 0xffe983;
const GREEN = 0x77dd77;
const BLUE = 0x0da2ff;
const INDIGO = 0x6666ff;
const VIOLET = 0x9966ff;
const GREY = 0xffffff;

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };
        this.meshes = [];

        var quotes = {
            "red": "some people are worth melting for",
            "green": "the best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart"
        }

        // Set background to a nice color
        this.background = new Color(0xFFCCC0);


        // this.background = new THREE.CubeTextureLoader()
		// 	.load( [
        //         POSX, NEGX,
        //         POSY, NEGY,
        //         POSZ, NEGZ
        // ] );

        const lights = new BasicLights();
        this.add(lights);

        const star0 = new Star(this, -5, -5, 0, RED, quotes['red']);
        setTimeout(addStar, 1000, this, star0);

        const star1 = new Star(this, -4, -4, 0, ORANGE, quotes['green']);
        setTimeout(addStar, 1000, this, star1);

        const star2 = new Star(this, -3, -3, 0, YELLOW, quotes['green']);
        setTimeout(addStar, 1000, this, star2);

        const star3 = new Star(this, -2, -2, 0, GREEN, quotes['green']);
        setTimeout(addStar, 1000, this, star3);

        const star4 = new Star(this, -1, -1, 0, BLUE, quotes['green']);
        setTimeout(addStar, 1000, this, star4);

        const star5 = new Star(this, 0, 0, 0, INDIGO, quotes['green']);
        setTimeout(addStar, 1000, this, star5);

        const star6 = new Star(this, 1, 1, 0, VIOLET, quotes['green']);
        setTimeout(addStar, 1000, this, star6);

        const star7 = new Star(this, 2, 2, 0, GREY, quotes['green']);
        setTimeout(addStar, 1000, this, star7);

        const star8 = new Star(this, 3, 3, 0, 0x00ff00, quotes['green']);
        setTimeout(addStar, 1000, this, star8);

        const star9 = new Star(this, 4, 4, 0, 0x00ff00, quotes['green']);
        setTimeout(addStar, 1000, this, star9);

        const star10 = new Star(this, 5, 5, 0, 0x00ff00, quotes['green']);
        setTimeout(addStar, 1000, this, star10);

        function addStar(scene, s) {
            scene.add(s);
            scene.meshes.push(s.mesh);
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
