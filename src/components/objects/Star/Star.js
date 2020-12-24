import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import MODEL from './Star.obj';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import POSX from "../../scenes/textures/Earth/posx.jpg";
import NEGX from "../../scenes/textures/Earth/negx.jpg";
import POSY from "../../scenes/textures/Earth/posy.jpg";
import NEGY from "../../scenes/textures/Earth/negy.jpg";
import POSZ from "../../scenes/textures/Earth/posz.jpg";
import NEGZ from "../../scenes/textures/Earth/negz.jpg";
class Star extends THREE.Group {
    constructor(parent, x, y, z, color, quote) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            bob: true,
            spin: this.spin.bind(this),
            twirl: 0,
        };
        this.x = x;
        this.y = y;
        this.z = z;
        this.mesh;

        this.name = "Star";
        this.quote = quote;

        const textureCube = new THREE.CubeTextureLoader()
        	.load( [
                POSX, NEGX,
                POSY, NEGY,
                POSZ, NEGZ
        ] );

        textureCube.mapping = THREE.CubeRefractionMapping;
        // // args: radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
        // const geometry = new THREE.SphereBufferGeometry(5, 32, 32, 0, 2 * Math.PI, 0, 0.5 * Math.PI);
        const geometry = new THREE.SphereBufferGeometry(0.5, 10, 10);

        const objLoader = new OBJLoader();
        var material = new THREE.MeshPhongMaterial({
            color: color,
            envMap: textureCube, 
            // envMap: parent.background,
            refractionRatio: 0.5,
            specular: 0xffffff,
            shininess: 1000
        });
        // material.side = THREE.DoubleSide;

        // const obj = new THREE.Mesh(geometry, material);

        var mesh;
        objLoader.load(MODEL, obj => {
            // obj.children[0].material = material;
            // obj.scale.multiplyScalar(0.2);
            // obj.rotation.set(Math.PI/2, 0, 0);
            var child = obj.children[0];
            mesh = new THREE.Mesh(child.geometry, material);
            mesh.scale.multiplyScalar(0.2);
            mesh.scale.set(0.1, 0.25, 0.1);
            mesh.rotation.set(Math.PI / 2, 0, 0);
            // this.mesh = mesh;
            // this.mesh = obj;
            // this.add(obj);

            var pivot = new THREE.Group();
            pivot.position.set(x, y, z);
            mesh.position.set(0, 0, -0.3)
            // this.add(obj);
            // pivot.add(mesh);
            // mesh.add(pivot);

            this.add(pivot);
            this.add(mesh);

            this.pivot = pivot;

            this.mesh = mesh;
            this.pivot.add(this.mesh);
            this.mesh.star = this;

            // visualiz pivot
            // var pivotSphereGeo = new THREE.SphereGeometry( 0.1 );
            // var pivotSphere = new THREE.Mesh(pivotSphereGeo);
            // pivotSphere.position.set(pivot.position.x, pivot.position.y, pivot.position.z );
            // parent.add( pivotSphere );

            // parent.add( new THREE.AxesHelper() );

            // parent.add(pivot);
        });





        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        // this.state.gui.add(this.state, 'bob');
        // this.state.gui.add(this.state, 'spin');
    }

    spin() {
        // Add a simple twirl
        this.state.twirl += Math.PI / 10;
    }

    jump() {
        this.state.twirl += 15 * Math.PI;
        const jumpUp = new TWEEN.Tween(this.pivot.position)
            .to({ y: this.pivot.position.y + 3 }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out);
        const fallDown = new TWEEN.Tween(this.pivot.position)
            .to({ y: this.y }, 1000)
            .easing(TWEEN.Easing.Quadratic.In);

        // Fall down after jumping up
        jumpUp.onComplete(() => fallDown.start());

        // Start animation
        jumpUp.start();
    }

    stopSpin() {
        // Add a simple twirl
        this.state.twirl = 0;
        this.pivot.rotation.y = 0;
    }



    update(timeStamp) {
        // if (this.state.bob) {
        //     // Bob back and forth
        //     this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        // }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            this.state.twirl -= Math.PI / 8;
            this.pivot.rotation.y += Math.PI / 8;
        }

        // Advance tween animations, if any exist
        TWEEN.update();
    }
}

export default Star;
