import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import POSX from "../../scenes/textures/Earth/posx.jpg";
import NEGX from "../../scenes/textures/Earth/negx.jpg";
import POSY from "../../scenes/textures/Earth/posy.jpg";
import NEGY from "../../scenes/textures/Earth/negy.jpg";
import POSZ from "../../scenes/textures/Earth/posz.jpg";
import NEGZ from "../../scenes/textures/Earth/negz.jpg";
class Globe extends THREE.Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: true,
            spin: this.spin.bind(this),
            twirl: 0,
        };


        const textureCube = new THREE.CubeTextureLoader()
			.load( [
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
        ] );

        textureCube.mapping = THREE.CubeRefractionMapping;
        // // args: radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
        // const geometry = new THREE.SphereBufferGeometry(5, 32, 32, 0, 2 * Math.PI, 0, 0.5 * Math.PI);
        const geometry = new THREE.SphereBufferGeometry(5, 32, 32);

        const material = new THREE.MeshPhongMaterial( {
            color: 0xccddff, 
            envMap: textureCube, 
            refractionRatio: 0.98, 
            reflectivity: 0.9
        });
        material.side = THREE.DoubleSide;

        const sphere = new THREE.Mesh(geometry, material);
        
        this.add(sphere);
        
        // var a = CSG.cube();
        // var b = CSG.sphere({ radius: 1.35, stacks: 12 });
        // var c = CSG.cylinder({ radius: 0.7, start: [-1, 0, 0], end: [1, 0, 0] });
        // var d = CSG.cylinder({ radius: 0.7, start: [0, -1, 0], end: [0, 1, 0] });
        // var e = CSG.cylinder({ radius: 0.7, start: [0, 0, -1], end: [0, 0, 1] });
        // var a = CSG.cube();
        // var material = new THREE.MeshBasicMaterial( {
        //     color: 0xff0000
        // });
        // var newMesh = a.toMesh(material);
        // this.add(newMesh)

        // width height depth
        // var box = new THREE.Mesh( new THREE.BoxGeometry( 5, 5, 5 ) );
        // var box_bsp = new ThreeBSP( box );

        // // radius widthsegments heightsegments
        // var cutgeo = new THREE.SphereGeometry( 3, 20, 20 );
        // var sub = new THREE.Mesh( cutgeo, material );
        // var subtract_bsp  = new ThreeBSP( sub );
        // var result_bsp  = box_bsp.subtract( subtract_bsp );

        // var result = result_bsp.toMesh();
        // result.material = material;
        // this.add( result );

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        this.state.gui.add(this.state, 'bob');
        this.state.gui.add(this.state, 'spin');
    }

    spin() {
        // Add a simple twirl
        this.state.twirl += 6 * Math.PI;

        // Use timing library for more precice "bounce" animation
        // TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
        // Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
        const jumpUp = new TWEEN.Tween(this.position)
            .to({ y: this.position.y + 1 }, 300)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.position)
            .to({ y: 0 }, 300)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }

    update(timeStamp) {
        if (this.state.bob) {
            // Bob back and forth
            this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            this.state.twirl -= Math.PI / 8;
            this.rotation.y += Math.PI / 8;
        }

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Globe;
