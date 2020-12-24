import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import POSX from "../../scenes/textures/Earth/posx.jpg";
import NEGX from "../../scenes/textures/Earth/negx.jpg";
import POSY from "../../scenes/textures/Earth/posy.jpg";
import NEGY from "../../scenes/textures/Earth/negy.jpg";
import POSZ from "../../scenes/textures/Earth/posz.jpg";
import NEGZ from "../../scenes/textures/Earth/negz.jpg";
class Star extends THREE.Group {
    constructor(parent, x, y, z) {
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

        this.name = "Star";
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

        // const geometry = new THREE.BoxGeometry(1, 1, 1);

        // const material = new THREE.MeshPhongMaterial( {
        //     color: 0xaa0000, 
        //     envMap: textureCube, 
        //     // refractionRatio: 0.98, 
        //     reflectivity: 0.9
        // });

        var material = new THREE.MeshPhongMaterial({
            color: 0xaa0000,
            envMap: textureCube, 
            // envMap: parent.background,
            refractionRatio: 0.5,
            specular: 0xffffff,
            shininess: 1000
          });
        // material.side = THREE.DoubleSide;

        const obj = new THREE.Mesh(geometry, material);
        obj.position.x = x;
        obj.position.y = y;
        obj.position.z = z;
        this.mesh = obj;


        var pivot = new THREE.Group();
        pivot.position.set( x, y, z );

        this.add(obj);

        this.add(pivot);
        
        pivot.add(obj);
  
        // visualiz pivot
        // var pivotSphereGeo = new THREE.SphereGeometry( 0.1 );
        // var pivotSphere = new THREE.Mesh(pivotSphereGeo);
        // pivotSphere.position.set(pivot.position.x, pivot.position.y, pivot.position.z );
        // parent.add( pivotSphere );
        
        // parent.add( new THREE.AxesHelper() );
  
        this.pivot = pivot;
        this.obj = obj;
        parent.add(pivot);

        

        // Add self to parent's update list
        parent.addToUpdateList(this);

        // Populate GUI
        // this.state.gui.add(this.state, 'bob');
        // this.state.gui.add(this.state, 'spin');
    }

    spin() {
        // Add a simple twirl
        this.state.twirl +=  Math.PI / 10;
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
