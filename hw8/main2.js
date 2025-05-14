import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

const mindarThree = new MindARThree({
  container: document.body,
  imageTargetSrc: "../images/kvadevit.mind"
});

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

// Світло
anchor.group.add(new THREE.AmbientLight(0xffffff, 0.6));
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(1, 1.5, 1);
anchor.group.add(pointLight);

// Куб з блиском
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x4caf50, metalness: 0.3, roughness: 0.3 })
);
cube.position.x = -1.5;
anchor.group.add(cube);

// Піраміда з текстурою або прозорістю
const pyramid = new THREE.Mesh(
  new THREE.CylinderGeometry(0, 0.8, 2, 4),
  new THREE.MeshStandardMaterial({ color: 0xffb74d, metalness: 0.5, roughness: 0.2 })
);
pyramid.position.x = 1.5;
anchor.group.add(pyramid);

await mindarThree.start();

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.scale.y = 1 + 0.1 * Math.sin(Date.now() * 0.002);

  pyramid.rotation.y += 0.01;
  pyramid.scale.y = 1 + 0.05 * Math.sin(Date.now() * 0.0025);

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
