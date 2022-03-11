import { World } from './World/World.js';
// import { stopAnim } from './World/components/animAux.js';

const loader = new THREE.FileLoader();
var bodiesData;

function main() {

  // Get a reference to the container element
  const container = document.getElementById('webgl');

  //load the data and start the loop when loaded
  loader.load(
    // resource URL
    'bodiesData.json',

    // onLoad callback. Will trigger when file is loaded
    function (data) {

      // parse raw data to object format
      bodiesData = JSON.parse(data);

      // create a new world
      const world = new World(container, bodiesData);
      world.name = "world";

      // start the animation loop
      world.start();
    },

    // onProgress callback
    // function (xhr) {
    //   console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    // },

    // onError callback
    // function (err) {
    //   console.error('An error happened loading info '+err);
    // }
  );

}

main();

