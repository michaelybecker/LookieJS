// default scene loaded in src/engine/engine.js

import {
  Scene,
  TorusBufferGeometry,
  DirectionalLight,
  Mesh,
  Vector3,
  MeshStandardMaterial,
  Color,
} from "three";

import { camera } from "../engine/camera";

const scene = new Scene();

const ringsData = [
  { axis: new Vector3(1, 0, 1), color: new Color(0xff0000), scale: 0.2 },
  { axis: new Vector3(1, -1, 0), color: new Color(0x00ff00), scale: 0.15 },
  { axis: new Vector3(0, 1, 0), color: new Color(0x0000ff), scale: 0.1 },
];

ringsData.forEach((ringData, i) => {
  const ring = new Mesh(
    new TorusBufferGeometry(0.5, 0.032, 64, 64),
    new MeshStandardMaterial({
      metalness: 0.5,
      roughness: 0.5,
      color: ringData.color,
    })
  );
  // ring.position.z -= 10;
  ring.scale.set(ringData.scale, ringData.scale, ringData.scale);

  ring.Update = () => {
    ring.rotateOnAxis(ringData.axis, 0.0033 * (i * 2 + 1));
  };
  scene.add(ring);
  // ring.position.z -= 1;
});

const light = new DirectionalLight(0xffffff, 3.5);
light.position.set(0, 13, 3);
scene.add(light);

export { scene };