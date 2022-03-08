

var sunmassearthmass = 1.989e30/6e24;
var sqrtGM =Math.sqrt(6.67e-11*sunmassearthmass);
console.log(sqrtGM);

var sqrtGMprime = 1;
const clock = new THREE.Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
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
    

    for (const object of this.updatables) {
      let a = object.children[0].orbitRadius;
      object.rotation.z = elapsedTime*(1*sqrtGMprime)/(Math.sqrt(a*a*a));
   
      // object.rotation.y =delta*elapsedTime;
      // object.tick(delta,elapsedTime);
    }

  }
}

export { Loop };
