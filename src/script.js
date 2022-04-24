import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const canvas = document.querySelector(".webgl");

// creating scene
const scene = new THREE.Scene();

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.position.z = 1;

// console.log(mesh.position.distanceTo(camera.position)); to check the distance between objects

// mesh.position.set(-0.5, 1, 1);

// scale
// mesh.scale.x = 8;
// mesh.scale.y = 2;
// mesh.scale.z = 2;
// mesh.scale.set(8, 2, 2);

// rotation
// mesh.rotation.x = 1;
// mesh.rotation.y = 1;
// mesh.rotation.z = 1;

// sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);
camera.lookAt(mesh.position);
scene.add(camera);

camera.position.z = 3;

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const cursor = {
  x: 0,
  y: 0,
};

addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  // console.log(cursor.y);
});

// Clock
const clock = new THREE.Clock();

// let Time = Date.now();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  // const currentTime = Date.now();
  // const dateTime = currentTime - Time;
  // Time = currentTime;
  // console.log(dateTime);

  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);

  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.x = cursor.x;
  // mesh.position.y = cursor.y;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y;
  // camera.lookAt(mesh.position);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
