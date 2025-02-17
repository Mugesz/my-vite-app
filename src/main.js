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
const material = new THREE.MeshStandardMaterial( { color: 0xff6347, wireframe:true} ); 
const torus = new THREE.Mesh( geometry, material );
 scene.add( torus );

// Create an ambient light for base illumination
const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(ambientLight);

// Create a point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(40, 10, 40);
scene.add(pointLight);

// Animation function
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.005;
  renderer.render(scene, camera);
}
animate();
