import { displayBodiesData } from "../components/animAux.js";


var sunmassearthmass = 1.989e30 / 6e24;
var sqrtGM = Math.sqrt(6.67e-11 * sunmassearthmass);
// console.log(sqrtGM);

// let planetMoveData;

var sqrtGMprime = 1;
const clock = new THREE.Clock();

class Loop {
  constructor(camera, scene, renderer,bodiesData) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
    this.planetData= bodiesData.bodies.planets;
  }

  start() {
    

    // var planetData= bodiesData.bodies.planets;

    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame

      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    // var delta = clock.getDelta();
    // delta*=0.1;
    // console.log(delta)

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );
    var elapsedTime = clock.getElapsedTime();



    // let planetData = bodiesData.bodies.planets;
    for (const object of this.updatables) {
      if (object.name != "sunGroup") {
        let a = object.orbitRadius;

        // this was used for circular motion inside group
        // object.rotation.z = elapsedTime * (1 * sqrtGMprime) / (Math.sqrt(a * a * a));

        // placeholder equation for x and y, valid for circular only
        object.position.x = object.orbitRadius*Math.cos(elapsedTime*((1 * sqrtGMprime) / (Math.sqrt(a * a * a))));
        object.position.y = object.orbitRadius*Math.sin(elapsedTime*((1 * sqrtGMprime) / (Math.sqrt(a * a * a))))
        // planetMoveData[object.name][x]=object.position.x;
        // planetMoveData[object.name][y]=object.position.y;


        // rotation around self axis
        object.rotation.y = elapsedTime*(Math.PI)*2*50/this.planetData[object.name].rotationPeriod;
        
        // object.tick(delta,elapsedTime);
      }
    }
    displayBodiesData(this.planetData,elapsedTime);

  }
}

export { Loop };
