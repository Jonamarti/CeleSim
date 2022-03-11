
function createPlanet(radius, xpos = 0, ypos = 0, zpos = 0) {


	const geometry = new THREE.SphereGeometry(radius, 24, 24);
	const material = new THREE.MeshBasicMaterial();
	const planet = new THREE.Mesh(geometry, material);

	
	planet.position.x = xpos;
	planet.position.y = ypos;
	planet.position.z = zpos;

	planet.orbitRadius = Math.sqrt(xpos**2 + ypos**2 + zpos**2);

	planet.rotation.set(-0.5, -0.1, 0.8);

	


	// this method will be called once per frame
	planet.tick = () => {
		// var clock = new THREE.Clock();

		// var timeElapsed = clock.getElapsedTime();


		// var timeDelta = clock.getDelta();

		// console.log(elapsedTime)
		// increase the planet's rotation each frame
		// planet.rotation.z += radiansPerSecond * delta;
		// planet.rotation.x += radiansPerSecond * delta;
		// planet.rotation.y += radiansPerSecond * delta;
		// planet.position.x = planet.radius*Math.cos(radiansPerSecond * delta * elapsedTime*10);
		// planet.position.y = planet.radius*Math.sin(radiansPerSecond * delta * elapsedTime*10);
		// console.log(radiansPerSecond * delta * elapsedTime*1)
	};

	return planet;
}

export { createPlanet };
