function createControls(camera,renDom) {
	const controls = new THREE.OrbitControls(camera, renDom);
	return controls;
}

// controls = new THREE.OrbitControls(camera, renderer.domElement);
export {createControls}