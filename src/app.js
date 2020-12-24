/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import * as THREE from 'three';
import * as CSG from './csg.js';
import ThreeBSP from './ThreeCSG.js';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });

var projector, mouse = {
    x: 0,
    y: 0
  },
  INTERSECTED;

// Set up camera
camera.position.set(6, 3, -10);
// camera.position.set(0, 0, 0);
camera.lookAt(new Vector3(0, 0, 0));

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 16;
controls.update();



// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);
    window.requestAnimationFrame(onAnimationFrameHandler);
    // update();
    render();
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);


// function onDocumentMouseMove(event) {

//     var mouse = new THREE.Vector2();
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//     var raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, camera );
//     var intersects = raycaster.intersectObjects( planes );

//     if(intersects.length > 0) {
//         $('html,body').css('cursor', 'pointer');
//     } else {
//         $('html,body').css('cursor', 'default');
//     }

// }


// document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onMouseMove, false );

// function onDocumentMouseDown( event ) 
// {
//     event.preventDefault();
//     var mouse = new THREE.Vector2();
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//     var raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, camera );               
//     var intersects = raycaster.intersectObjects( planes );                  

//     var matched_marker = null;
//     if(intersects.length > 0)
//     {
//         //$('html,body').css('cursor','pointer');//mouse cursor change
//         for ( var i = 0;  intersects.length > 0 && i < intersects.length; i++)
//         {
//             window.open(intersects[0].object.userData.URL);
//         }
//     }
//     else {
//             //$('html,body').css('cursor','cursor');
//     }
// }


function onMouseMove(event) {
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    // event.preventDefault();
  
    // update the mouse variable
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
var raycaster = new THREE.Raycaster();

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.meshes );
    if (intersects.length > 0) {
        for ( let i = 0; i < intersects.length; i ++ ) {
            // intersects[ i ].object.material.color.set( 0xff0000 );
            console.log(intersects[i].object.parent)
            intersects[i].object.parent.spin();
        }
    }
    // else {
    //     for ( let i = 0; i < intersects.length; i ++ ) {
    //         // intersects[ i ].object.material.color.set( 0xff0000 );
    //         intersects[i].object.parent.stop();
    //     } 
    // }

	renderer.render( scene, camera );

}

function update() {


    // find intersections

    var vector = new THREE.Vector3(mouse.x, mouse.y, 1).unproject(camera);

    raycaster.set(camera.position, vector.sub(camera.position).normalize());

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        console.log('intersects');

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
             /*******************************************************************/   
/// You can change the Z position like the way done below
   intersects[0].object.position.z+=10;
/********************************************************************/
            

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
            

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;

    }
    // raycaster.setFromCamera(mouse, camera);
    //  var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    // vector.unproject(camera);
    // var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    // let intersects = ray.intersectObjects(scene.children);
    // if (intersects.length !== 0) {
    //     console.log('intersect');
    //     let obj = intersects[0].object;
    //     obj.material.color.set(0xffff00);
    // }
    // var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    // vector.unproject(camera);
    // var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  
    // // create an array containing all objects in the scene with which the ray intersects
    // var intersects = ray.intersectObjects(scene.children);
    // // INTERSECTED = the object in the scene currently closest to the camera 
    // //		and intersected by the Ray projected from the mouse position 	
  
    // // if there is one (or more) intersections
    // if (intersects.length > 0) {
    //     console.log('intersect');
    //   // if the closest object intersected is not the currently stored intersection object
    //   if (intersects[0].object != INTERSECTED) {
    //     // restore previous intersection object (if it exists) to its original color
    //     if (INTERSECTED)
    //       INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    //     // store reference to closest object as current intersection object
    //     INTERSECTED = intersects[0].object;
    //     // store color of closest object (for later restoration)
    //     INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
    //     // set a new color for closest object
    //     INTERSECTED.material.color.setHex(0xffff00);
    //   }
    // } else // there are no intersections
    // {
    //   // restore previous intersection object (if it exists) to its original color
    //   if (INTERSECTED)
    //     INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
    //   // remove previous intersection object reference
    //   //     by setting current intersection object to "nothing"
    //   INTERSECTED = null;
    // }

}