import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create a torus
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 , wireframe:true} ); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add( torus );

// Create an ambient light for base illumination
const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(ambientLight);

// Create a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 20, 10);
scene.add(pointLight);

//Light helper
const lightHelper = new THREE.PointLightHelper(pointLight);

// grid helper
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(()=> THREE.MaterialLoader.randFloatSpread(100));

  star.position.set(x, y, z); 
  scene.add(star);

  Array(200).fill().forEach(addStar);
}

// Animation function
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.00;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}
animate();
