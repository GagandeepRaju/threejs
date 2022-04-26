import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
const canvas = document.querySelector(".webgl");

const gui = new dat.GUI();
// light
// const light = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(light);

// creating scene
const scene = new THREE.Scene();

// create 50 triangles
const count = 500;

// buffer geomatry
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 2;
}

const positionsAttributes = new THREE.BufferAttribute(positionsArray, 3);

// console.log(positionsAttributes);

// color
const parameters = {
  color: 0x002244,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
// Red cube
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttributes);
const material = new THREE.MeshBasicMaterial({
  color: parameters.color,
  wireframe: true,
});
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
  width: window.innerWidth,
  height: window.innerHeight,
};

// screen resizes
window.addEventListener("resize", () => {
  //resizing screen
  // console.log("resize");
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

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

//Double click screen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

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

//GUI debug
gui.add(mesh.position, "y", -1, 1, 0.05);
gui.add(mesh.position, "x", -1, 1, 0.05);
gui.add(mesh.position, "z", -1, 1, 0.05);
gui.add(parameters, "spin");
gui.addColor(parameters, "color").onChange(() => {
  //
  material.color.set(parameters.color);
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
