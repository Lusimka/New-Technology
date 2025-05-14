import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xf0f4c3); // світлий фон

// Освітлення
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(2, 2, 2);
scene.add(light);

// Куб з легким прозорим ефектом
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0x4caf50, transparent: true, opacity: 0.8, roughness: 0.5 })
);
cube.position.x = -2;
scene.add(cube);

// Піраміда з блиском
const pyramid = new THREE.Mesh(
  new THREE.CylinderGeometry(0, 0.8, 2, 4),
  new THREE.MeshStandardMaterial({ color: 0xffd54f, metalness: 0.4, roughness: 0.2 })
);
pyramid.position.x = 2;
scene.add(pyramid);

camera.position.z = 6;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.scale.y = 1 + 0.1 * Math.sin(Date.now() * 0.002);

  pyramid.rotation.y += 0.01;
  pyramid.scale.y = 1 + 0.05 * Math.sin(Date.now() * 0.0025);

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
