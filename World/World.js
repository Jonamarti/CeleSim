import { createCamera } from './components/camera.js';
// import { createCube } from './components/cube.js';
import { createPlanet } from './components/planet.js';
import { createStar } from './components/lights.js';
import { createScene } from './components/scene.js';
import { createControls } from './components/controls.js';
import { createAxisHelper } from './components/helperAxis.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';



let camera;
let renderer;
let scene;
let loop;
let controls;
let axisHelper;

class World {
  constructor(container) {

    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    controls = createControls(camera, renderer.domElement);
    axisHelper = createAxisHelper();

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    console.log(renderer.domElement)

    // star
    const sun = createStar(10, 0.05, 0, 0, 0);

    // planets
    const mercury = createPlanet(0.02, 0.2, 0.2,0.2);
    mercury.name="mercury";
    const venus = createPlanet(0.072, 0.4, 0.4,0.4);
    const earth = createPlanet(0.1, 1, 0,0);
    earth.material.color.setHex(0x000000);
    const mars = createPlanet(1.4, 6, 7);

    // planets group for containment and rotating
    var mercuryGroup = new THREE.Group();
    mercuryGroup.add(mercury);
    mercuryGroup.name="mercuryGroup";
    // mercuryGroup.add(mercuryOrbit);

    var venusGroup = new THREE.Group();
    venusGroup.add(venus);
    venusGroup.name="venusGroup";
    // venusGroup.add(venusOrbit);


    var earthGroup = new THREE.Group();
    earthGroup.add(earth);
    earthGroup.name="earthGroup";
    // earthGroup.add(earthOrbit);

    var marsGroup = new THREE.Group();
    marsGroup.add(mars);
    marsGroup.name="marsGroup";
    // marsGroup.add(marsOrbit);

    // orbit circles (aethetics for now)
    // var mercOrbit = getOrbitCircle(planetsData["mercury"].orbitSemimajorRadius, planetsData["mercury"].orbitSemimajorRadius);

    loop.updatables.push(mercuryGroup, venusGroup, earthGroup, marsGroup);

    scene.add(sun, mercuryGroup, venusGroup, earthGroup, marsGroup, axisHelper);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
