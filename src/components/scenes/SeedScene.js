import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import * as THREE from 'three';
import { Star } from 'objects';
import { BasicLights } from 'lights';
import POSX from "./textures/Earth/posx.jpg";
import NEGX from "./textures/Earth/negx.jpg";
import POSY from "./textures/Earth/posy.jpg";
import NEGY from "./textures/Earth/negy.jpg";
import POSZ from "./textures/Earth/posz.jpg";
import NEGZ from "./textures/Earth/negz.jpg";

const RED = 0xff8e88;
const ORANGE = 0xFF8161;
const YELLOW = 0xffe983;
const GREEN = 0x77dd77;
const GREEN0 = 0xC5EFC2;
const BLUE = 0x0da2ff;
const BLUE0 = 0xC2ECEF;
const INDIGO = 0x6666ff;
const VIOLET = 0x9966ff;
const VIOLET0 = 0x9359DF;
const GREY = 0xffffff;
const PINK = 0xFF61A9;
const quotes = [
    "\"some people are worth melting for\"<br><br><br>olaf",
    "\"the best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart.\"<br><br><br>helen keller",
    "\"out of suffering have emerged the strongest souls;<br>the most massive characters are seared with scars.\"<br><br><br>kahlil gibran",
    "\"life is not measured by the number of breaths we take,<br>but by the moments that take our breath away.\"<br><br><br>maya angelou",
    // "\"be more concerned with your character than your reputation,<br>because your character is what you really are,<br>while your reputation is merely what others think you are.\"<br><br><br>john wooden",
    "\"give every day the chance to become the most beautiful day of your life.\"<br><br><br>mark twain",
    "\"do not pray for an easy life,<br>pray for the strength to endure a difficult one.\"<br><br><br>bruce lee",
    "\"i have found that if you love life, life will love you back.\"<br><br><br>arthur rubinstein",
    "\"don’t ask what the world needs.<br>ask what makes you come alive and go do it.<br>because what the world needs are more people who have, life.\"<br><br><br>howard thurman",
    "\"i have been impressed with the urgency of doing.<br>knowing is not enough; we must apply.<br>being willing is not enough; we must do.\"<br><br><br>leonardo da vinci",
    "\"happiness is like a butterfly.<br>the more you chase it, the more it eludes you.<br>but if you turn your attention to other things,<br>it comes and sits softly on your shoulder.\"<br><br><br>henry david thoreau",
    "\"thousands of candles can be lit from a single candle,<br>and the life of the candle will not be shortened.<br>happiness never decreases by being shared.\"<br><br><br>buddha",
    "\"the foolish man seeks happiness in the distance,<br>the wise grows it under his feet.\"<br><br><br>james oppenheim",
    "\"everything has beauty, but not everyone can see.\"<br><br><br>confucius",
    "\"what you get by achieving your goals is not as important as what you become by achieving your goals.\"<br><br><br>henry david thoreau"
];

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



        // Set background to a nice color
        // this.background = new Color(0xFFCCC0);
        this.background = new Color(0xFFA2A7);
        // this.background = new Color(0xB2DC8D);
        this.background = new Color(0xFFB5C3);

        // this.background = new THREE.CubeTextureLoader()
		// 	.load( [
        //         POSX, NEGX,
        //         POSY, NEGY,
        //         POSZ, NEGZ
        // ] );

        const lights = new BasicLights();
        this.add(lights);
        const star0 = new Star(this, -6, 1, 0, INDIGO, quotes[0]);
        setTimeout(addStar, 1000, this, star0);

        const star1 = new Star(this, -4, 3, 0, YELLOW, quotes[1]);
        setTimeout(addStar, 1000, this, star1);

        const star2 = new Star(this, -2, 1, 0, VIOLET0, quotes[2]);
        setTimeout(addStar, 1000, this, star2);

        const star3 = new Star(this, 0, 3, 0, GREEN, quotes[3]);
        setTimeout(addStar, 1000, this, star3);

        const star4 = new Star(this, 2, 1, 0, BLUE, quotes[4]);
        setTimeout(addStar, 1000, this, star4);

        const star5 = new Star(this, 4, 3, 0, RED, quotes[5]);
        setTimeout(addStar, 1000, this, star5);

        const star6 = new Star(this, 6, 1, 0, 0xD192ED, quotes[6]);
        setTimeout(addStar, 1000, this, star6);

        const star7 = new Star(this, -6, -3, 0, PINK, quotes[7]);
        setTimeout(addStar, 1000, this, star7);

        const star8 = new Star(this, -4, -1, 0, 0x64CAB3, quotes[8]);
        setTimeout(addStar, 1000, this, star8);

        const star9 = new Star(this, -2, -3, 0, ORANGE, quotes[9]);
        setTimeout(addStar, 1000, this, star9);

        const star10 = new Star(this, 0, -1, 0, BLUE0, quotes[10]);
        setTimeout(addStar, 1000, this, star10);

        const star11 = new Star(this, 2, -3, 0, 0xDC5A85, quotes[11]);
        setTimeout(addStar, 1000, this, star11);

        const star12 = new Star(this, 4, -1, 0, 0x5A61DC, quotes[12]);
        setTimeout(addStar, 1000, this, star12);

        const star13 = new Star(this, 6, -3, 0, 0xFFDD52, quotes[13]);
        setTimeout(addStar, 1000, this, star13);

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
