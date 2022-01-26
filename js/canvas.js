

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
const loader = new THREE.GLTFLoader();

var myCanvas = document.getElementById("bg");
var canvasWidth = 450;
var canvasHeight = 400;
var model;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 10, canvasHeight / canvasWidth, 10, 10020 );
const renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(canvasHeight, canvasWidth);
const centerObj = new THREE.Object3D( );
const box = new THREE.Box3( )

function onWindowResize() {

  camera.aspect = myCanvas.clientWidth / myCanvas.clientHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(myCanvas.clientWidth, myCanvas.clientHeight);
}

loader.load(
  "./js/Dylan.glb",
  function (gltf) {
    model = gltf.scene;
  box.setFromObject( gltf.scene );
	const c = box.getCenter( new THREE.Vector3( ) );
	const size = box.getSize( new THREE.Vector3( ) );
	gltf.scene.position.set( -c.x, size.y / 15 - c.y, -c.z ); // center the gltf scene
	centerObj.add( gltf.scene );

model.position.set( 0, -2, 1);
  scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);



const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 20;
controls.maxDistance = 60;



const ambientLight = new THREE.AmbientLight(0xcccccc, 2)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight( 0xf26969, 4 );
scene.add( directionalLight );


camera.position.set( 10, 45, 50);
camera.rotation.order = 'YXZ';
camera.rotation.y = - Math.PI / 4;
camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );
camera.lookAt(box);


renderer.setPixelRatio(window.devicePixelRatio)

function animate() {
  requestAnimationFrame(animate);

  model.rotation.y += -0.003;
  controls.update();
  

  renderer.render(scene, camera);
}

animate();
