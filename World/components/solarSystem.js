import { createStar } from './createStar.js'
import { createPlanet } from './planet.js';
import { getOrbitCircle } from './getOrbitCircle.js'

var solarSystemBodies = [];
function createSolarSystem(bodiesData = {}) {

	const textureLoader = new THREE.TextureLoader();

	const sun = createStar(10, 0.2, 0, 0, 0);

	sun.name = "sunGroup";
	sun.bodyType = "fixedStar";


	const sunTexture = textureLoader.load(
		'/assets/textures/2k_sun.jpg',
	);
	sun.children[0].material.map = sunTexture;

	// planets
	let planetData = bodiesData.bodies.planets;

	// var planetArray = ["mercury", "venus", "earth", "mars"];

	// for(let name in planetArray){

	// }


	const mercury = createPlanet(0.05, planetData["mercury"].orbitSemimajorRadius, 0, 0);
	mercury.name = "mercury";
	const mercuryTexture = textureLoader.load(
		'/assets/textures/2k_mercury.jpg',
	);

	mercury.material.map = mercuryTexture;

	const venus = createPlanet(0.072, 0.4, 0.4, 0);
	venus.name = "venus";
	const venusTexture = textureLoader.load(
		'/assets/textures/2k_venus_surface.jpg',
	);
	venus.material.map = venusTexture;
	// venus.material.color.setHex(0x00f0f0);

	const earth = createPlanet(0.1, 1, 0, 0);
	earth.name = "earth";
	const earthTexture = textureLoader.load(
		'/assets/textures/2k_earth_daymap.jpg',
	);
	earth.material.map = earthTexture;
	// earth.material.color.setHex(0x66ffb2);


	const mars = createPlanet(0.09, 1.5, 0, 0);
	mars.name = "mars";
	const marsTexture = textureLoader.load(
		'/assets/textures/2k_mars.jpg',
	);
	mars.material.map = marsTexture;
	// mars.material.color.setHex(0xff0000);

	// planets group for containment and rotating
	var mercuryGroup = new THREE.Group();
	mercuryGroup.add(mercury);
	mercuryGroup.name = "mercuryGroup";
	var mercuryOrbit = getOrbitCircle(mercury)
	mercuryGroup.add(mercuryOrbit);

	var venusGroup = new THREE.Group();
	venusGroup.add(venus);
	venusGroup.name = "venusGroup";
	var venusOrbit = getOrbitCircle(venus)

	venusGroup.add(venusOrbit);


	var earthGroup = new THREE.Group();
	earthGroup.add(earth);
	earthGroup.name = "earthGroup";
	var earthOrbit = getOrbitCircle(earth)
	earthGroup.add(earthOrbit);

	var marsGroup = new THREE.Group();
	marsGroup.add(mars);
	marsGroup.name = "marsGroup";
	var marsOrbit = getOrbitCircle(mars)
	marsGroup.add(marsOrbit);

	// orbit circles (aethetics for now)

	// loop.updatables.push(mercuryGroup, venusGroup, earthGroup, marsGroup);
	// solarSystemBodies.push(sun, mercuryGroup, venusGroup, earthGroup, marsGroup);
	solarSystemBodies.push(sun, mercury, venus, earth, mars);


	return solarSystemBodies;
}

export { createSolarSystem }