

function getOrbitCircle(planet){


	var orbitRadius = planet.orbitRadius;
	
	const curve = new THREE.EllipseCurve(
		0, 0,
		// rx ry are equal for circular orbit, change later
		// rx, ry,
		orbitRadius, orbitRadius,
		0, 2 * Math.PI,
		false,
		0
	);
	
	const points = curve.getSpacedPoints(50);
	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints(points);
	// const material = new THREE.LineBasicMaterial({ color: 0xc0c0c0 });
	const material = new THREE.LineDashedMaterial({ color: 0xffaa00, dashSize: 0.1, gapSize: 0.1, linewidth: 0.2 });



	const orbit = new THREE.LineLoop(geometry, material);
	orbit.computeLineDistances();
	orbit.castShadow = false;

	return orbit;
}

export { getOrbitCircle}