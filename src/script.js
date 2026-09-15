import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import holographicVertexShader from "./shaders/holographic/vertex.glsl";
import holographicFragmentShader from "./shaders/holographic/fragment.glsl";

import { gsap } from "gsap";

import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

const container = document.querySelector("#escena_completa");

// Scene
const scene = new THREE.Scene();

/**
 * IFrame
 */
const cssRenderer = new CSS3DRenderer();

cssRenderer.setSize(window.innerWidth, window.innerHeight);

cssRenderer.domElement.style.position = "absolute";
cssRenderer.domElement.style.top = "0";
cssRenderer.domElement.style.zIndex = "2";
cssRenderer.domElement.style.pointerEvents = "none";

container.appendChild(cssRenderer.domElement);

const iframe = document.createElement("iframe");

iframe.src = "https://landing-portfolio-pied.vercel.app/";

iframe.style.width = "1036px";
iframe.style.height = "500px";
iframe.style.border = "none";

const iframeObject = new CSS3DObject(iframe);

iframeObject.position.set(0.35, 3.04, 3.65);

iframeObject.rotation.set(0, 0, 0);
iframeObject.rotation.y = Math.PI;

iframeObject.scale.set(0.003, 0.003, 0.003);

scene.add(iframeObject);

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

const hologramMaterial = new THREE.ShaderMaterial({
  vertexShader: holographicVertexShader,
  fragmentShader: holographicFragmentShader,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uColor: new THREE.Uniform(new THREE.Color("#0202ed")),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

let sceneComplete;

gltfLoader.load("portfolio.glb", (glb) => {
  sceneComplete = glb.scene;
  glb.scene.traverse((child) => {
    child.material = bakedMaterial;
  });
  const posterBox1 = glb.scene.children.find((i) => i.name === "logo-node");
  const posterBox2 = glb.scene.children.find((i) => i.name === "logo-react");
  const posterBox3 = glb.scene.children.find((i) => i.name === "logo-js");
  const posterBox4 = glb.scene.children.find((i) => i.name === "logo-threejs");
  const posterBox5 = glb.scene.children.find((i) => i.name === "logo-next");

  const sphereReact = glb.scene.children.find((i) => i.name === "Sphere003");
  const lazoReact = glb.scene.children.find((i) => i.name === "BézierCircle");
  const lazo1React = glb.scene.children.find(
    (i) => i.name === "BézierCircle001",
  );
  const lazo2React = glb.scene.children.find(
    (i) => i.name === "BézierCircle002",
  );

  sphereReact.material = hologramMaterial;
  lazoReact.material = hologramMaterial;
  lazo1React.material = hologramMaterial;
  lazo2React.material = hologramMaterial;

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

  cssRenderer.setSize(sizes.width, sizes.height);
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

camera.position.x = 6.017045523918793;
camera.position.y = 4.831433982907389;
camera.position.z = -2.8684944180970993;

camera.rotation.set(
  -2.575364817106507,
  0.9144333963919706,
  2.6750850010374205,
  "XYZ",
);

/**
 * 
 *
---Posicion inicial 
camera.position.x = 4.181897637027123;
camera.position.y = 4.7604200354011954;
camera.position.z = -5.3552223407604105;

camera.rotation.set(
    -2.7602499390136512,
    0.6396055743496778,
    2.906680457895719,
  );

---Posicion en Escritorio
camera.position.set(
1.9250707791872372,
2.5095010134057896,
-1.5621986263398147
  );

  camera.rotation.set(
2.984570337599676,
0.5722205874881774,
-3.0560683892254725

  )

---Posicion de estantes

  camera.position.set( 
  0.8574553727742282,
  4.208632857383509,
  0.030646920525037202);

  camera.rotation.set( 
  -1.807618761973358,
  1.471461702341815,
  1.8087483060992786)


 */

scene.add(camera);

// Controls
//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;

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

  hologramMaterial.uniforms.uTime.value = elapsedTime;
  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);
  cssRenderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

function moverCamara(camera, gsap, posicion, rotacion) {
  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(camera.rotation);

  const rotacionFinal = {
    x:
      camera.rotation.x +
      THREE.MathUtils.euclideanModulo(
        rotacion.x - camera.rotation.x + Math.PI,
        Math.PI * 2,
      ) -
      Math.PI,

    y:
      camera.rotation.y +
      THREE.MathUtils.euclideanModulo(
        rotacion.y - camera.rotation.y + Math.PI,
        Math.PI * 2,
      ) -
      Math.PI,

    z:
      camera.rotation.z +
      THREE.MathUtils.euclideanModulo(
        rotacion.z - camera.rotation.z + Math.PI,
        Math.PI * 2,
      ) -
      Math.PI,
  };

  gsap.to(camera.position, {
    x: posicion.x,
    y: posicion.y,
    z: posicion.z,
    duration: 1.5,
    ease: "power2.inOut",
  });

  gsap.to(camera.rotation, {
    x: rotacionFinal.x,
    y: rotacionFinal.y,
    z: rotacionFinal.z,
    duration: 1.5,
    ease: "power2.inOut",
  });
}
/*
window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "p") {
    console.log("camera.position:", camera.position);
    console.log("camera.rotation:", camera.rotation);
    console.log("controls.target:", controls.target);
  }
});
*/
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(sceneComplete.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;

    if (object.name == "Cube010") {
      const positionDesk = {
        x: 1.9250707791872372,
        y: 2.5095010134057896,
        z: -1.5621986263398147,
      };
      const rotacionDesk = {
        x: 2.984570337599676,
        y: 0.5722205874881774,
        z: -3.0560683892254725,
      };
      moverCamara(camera, gsap, positionDesk, rotacionDesk);
    }
    if (object.name == "Cube096") {
      const positionShelves = {
        x: 0.8574553727742282,
        y: 4.208632857383509,
        z: 0.030646920525037202,
      };
      const rotacionShelves = {
        x: -1.807618761973358,
        y: 1.471461702341815,
        z: 1.8087483060992786,
      };
      moverCamara(camera, gsap, positionShelves, rotacionShelves);
    }
  }
});
