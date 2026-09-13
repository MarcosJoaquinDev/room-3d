import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const bakedTexture = textureLoader.load("baked.jpg");

const reactImage = textureLoader.load("reactjs.webp");
const threjsImage = textureLoader.load("threeejs.png");
const nodeImage = textureLoader.load("node.png.webp");
const jsImage = textureLoader.load("jspost.png");
const nextImage = textureLoader.load("vercel.jpeg");

threjsImage.center.set(0.5, 0.5);
threjsImage.rotation = -Math.PI / 2;

reactImage.center.set(0.5, 0.5);
reactImage.rotation = -Math.PI / 2;

nodeImage.center.set(0.5, 0.5);
nodeImage.rotation = -Math.PI / 2;

jsImage.center.set(0.5, 0.5);
jsImage.rotation = -Math.PI / 2;

nextImage.center.set(0.5, 0.5);
nextImage.rotation = -Math.PI / 2;

bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

const bakedMaterial = new THREE.MeshBasicMaterial({
  map: bakedTexture,
});

const poster1Material = new THREE.MeshBasicMaterial({
  map: reactImage,
});
const poster2Material = new THREE.MeshBasicMaterial({
  map: threjsImage,
});
const poster3Material = new THREE.MeshBasicMaterial({
  map: nodeImage,
});
const poster4Material = new THREE.MeshBasicMaterial({
  map: jsImage,
});
const poster5Material = new THREE.MeshBasicMaterial({
  map: nextImage,
});

gltfLoader.load("portfolio.glb", (glb) => {
  glb.scene.traverse((child) => {
    child.material = bakedMaterial;
  });
  const posterBox1 = glb.scene.children.find((i) => i.name === "logo-node");
  const posterBox2 = glb.scene.children.find((i) => i.name === "logo-react");
  const posterBox3 = glb.scene.children.find((i) => i.name === "logo-js");
  const posterBox4 = glb.scene.children.find((i) => i.name === "logo-threejs");
  const posterBox5 = glb.scene.children.find((i) => i.name === "logo-next");
  posterBox1.material = poster1Material;
  posterBox2.material = poster2Material;
  posterBox3.material = poster3Material;
  posterBox4.material = poster4Material;
  posterBox5.material = poster5Material;

  scene.add(glb.scene);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4.181897637027123;
camera.position.y = 4.7604200354011954;
camera.position.z = -5.3552223407604105;
/**
 * 
 *
 * posicin inicial 
camera.position.x = 4.181897637027123;
camera.position.y = 4.7604200354011954;
camera.position.z = -5.3552223407604105;

camera.rotation.set(
    -2.7602499390136512,
    0.6396055743496778,
    2.906680457895719,
  );


 */

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
function moverCamara(camera, controls, gsap, posicion, target) {
  gsap.to(camera.position, {
    x: posicion.x,
    y: posicion.y,
    z: posicion.z,
    duration: 1.5,
    ease: "power2.inOut",
  });

  gsap.to(controls.target, {
    x: target.x,
    y: target.y,
    z: target.z,
    duration: 1.5,
    ease: "power2.inOut",
    onUpdate: () => {
      controls.update();
    },
  });
}
