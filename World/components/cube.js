

function createCube() {
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);
  const material = new THREE.MeshStandardMaterial({ color: 'purple' });
  const cube = new THREE.Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = 30*2*Math.PI/360;

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };
