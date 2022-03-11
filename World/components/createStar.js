

function createStar(intensity,radius,xpos=0,ypos=0,zpos=0) {
  // Create a point light with a sphere surrounding it
  	
  var star = new THREE.PointLight(0xff00ff, intensity);
	star.castShadow = true;

	var starSphere = new THREE.Mesh(
		new THREE.SphereGeometry(radius, 24, 24),
		new THREE.MeshBasicMaterial({
			color: "rgb(255,255,255)"
		})
	);
  star.add(starSphere);
 

  return star;
}

export { createStar };
