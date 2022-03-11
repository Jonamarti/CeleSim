import { createCamera } from './components/camera.js';
// import { createCube } from './components/cube.js';
// import { createPlanet } from './components/planet.js';
// import { createStar } from './components/createStar.js';
import { createScene } from './components/scene.js';
import { createControls } from './components/controls.js';
import { createAxisHelper } from './components/helperAxis.js';
import { createSolarSystem } from './components/solarSystem.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';



let camera;
let renderer;
let scene;
let loop;
let controls;
let axisHelper;
let solarSystem;
let planetMoveData;


class World {
  constructor(container, bodiesData) {

    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    controls = createControls(camera, renderer.domElement);
    axisHelper = createAxisHelper();


    // data

    // create solar system bodies
    solarSystem = createSolarSystem(bodiesData);

    // create an array for the anim loop with the planet data
    planetMoveData = bodiesData.bodies.planets;

    loop = new Loop(camera, scene, renderer, bodiesData);
    container.append(renderer.domElement);

    console.log(solarSystem)
    solarSystem.forEach(el => el.bodyType !="fixedStar"? loop.updatables.push(el) : console.log("found star: ",el))
    
 
    // orbit circles (aethetics for now)
    // var mercOrbit = getOrbitCircle(planetsData["mercury"].orbitSemimajorRadius, planetsData["mercury"].orbitSemimajorRadius);

    scene.add(axisHelper);

    solarSystem.forEach(el => scene.add(el))
    // loop.updatables.forEach((body) => scene.add(body))

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
