// import { getDistance, getPlanetsDistance, getInitData } from "./orbitFunctions.js";
// import bodies from "./bodiesData.json";
import { createCamera } from './components/camera.js';

// data for update loop. Populated by init conditions in json object
var planetMoveData = {
	"mercury": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0,
		"orbitPeriod": 0
	},
	"venus": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0,
		"orbitPeriod": 0
	},
	"earth": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
	"mars": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
	"jupiter": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
	"saturn": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
	"uranus": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
	"neptune": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
	"pluto": {
		"x": 0,
		"y": 0,
		"z": 0,
		"speedX": 0,
		"speedY": 0,
		"speedZ": 0
	},
}

var planetsArray = [];
var planetsData = {};
var planetMoveData;

var camera, controls, scene, renderer, stats, gui;
const clock = new THREE.Clock();

// Physics variables
const gravityConstant = - 9.8;
const G = 6.67e-11;

async function init() {

	// initialize scene, stats, camera, gui, clock 

	initConfig(camera, controls, scene, renderer, stats, gui);

	// initBodies();


	await readJson(initBodies)




	window.onresize = function () {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

	};

	// background stars
	// var backgroundStars = getBackgroundStars();
	// backgroundStars.name = 'backgroundStars';

	// var distancesArray = getPlanetsDistance(planetsArray);

	// let planetInfo = document.getElementById("planetInfo");
	// for (let plan in planetMoveData) {

	// 	planetInfo.innerHTML += `<p>${plan} R=${distancesArray[plan]}</p>
	// 	<p>${planetMoveData[plan].x}, ${planetMoveData[plan].y}</p>`;
	// }

	// readJson(getPlanets(update(renderer, scene, camera, controls, stats, clock, planetMoveData)));
	update(renderer, scene, camera, controls, stats, clock, planetMoveData);

	return scene;
}


function update(renderer, scene, camera, controls, stats, clock, planetMoveData, planetsData) {
	controls.update();
	stats.update();



	// var timeElapsed = clock.getElapsedTime();

	var timeDelta = clock.getDelta();




	timeDelta *= 0.00001; // this will slow down the animation

	// console.log(planetsData)


	// console.log(scene.getObjectsByName("mercuryGroup"))
	// planetsArray.forEach(element => {
	// 	element.position.x=
	// });
	// var planets = scene.getObjectByName("planetsArray");
	// planets["mercury"].position.x += planetMoveData["mercury"].speedX*2;
	// var merc = scene.getObjectByName("mercuryGroup").mercury;
	// console.log(merc)
	// merc.position.y = 100*Math.cos(1*timeElapsed);
	// merc.position.x = 100*Math.sin(1*timeElapsed)

	// merc.position.y += 1 * timeElapsed;
	// merc.position.x += 1 * timeElapsed;


	// for(let plan in planetMoveData){

	getPositionOrbit("mercury", planetMoveData["mercury"]["orbitSemimajorRadius"], 0, timeDelta * 0.01, displayPlanetsPositions);

	// }
	displayPlanetsPositions(scene, planetMoveData);
	// getPositionOrbit(merc,100,0,timeElapsed*10);



	// let planetInfo = document.getElementById("planetInfo");
	// for (let plan in planetMoveData) {

	// 	planetInfo.innerHTML += `<p>${plan} </p>
	// 	<p>${planetMoveData[plan].x}, ${planetMoveData[plan].y}</p>`;
	// }
	renderer.render(scene, camera);

	requestAnimationFrame(function () {
		update(renderer, scene, camera, controls, stats, clock, planetMoveData, planetsData);
	});
}





function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshLambertMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);
	mesh.receiveShadow = true;

	return mesh;
}

function getPointLight(intensity) {
	var light = new THREE.PointLight(0xffffff, intensity);
	light.castShadow = true;

	return light;
}


function getBackgroundStars() {
	var particleGeo = new THREE.Geometry();
	var particleMat = new THREE.PointsMaterial({
		color: 'rgb(255,255,255)',
		size: 2,
		map: new THREE.TextureLoader().load('/assets/textures/particle.jpg'),
		transparent: true,
		blending: THREE.AdditiveBlending,

	});

	var particleCount = 1000;
	var particleDistance = 500;



	for (let i = 0; i < particleCount; i++) {

		// var posX =  (Math.random()-0.5 ) * particleDistance;
		// var posY = (Math.random()-0.5 ) * particleDistance;
		// var posZ = (Math.random()-0.5 ) * particleDistance;

		var posX;
		var posY;
		var posZ;

		let ranTheta = Math.random() * (2 * Math.PI);
		let ranPhi = Math.random() * (2 * Math.PI);


		posX = particleDistance * Math.sin(ranPhi) * Math.sin(ranTheta);
		posY = particleDistance * Math.cos(ranTheta);
		posZ = particleDistance * Math.cos(ranPhi) * Math.sin(ranTheta);

		console.log(posX, posY, posZ)



		// let ranZ = 50 ** 2 - posX ** 2 - posY ** 2;


		var particle = new THREE.Vector3(posX, posY, posZ);
		particleGeo.vertices.push(particle);
	};

	var particleSystem = new THREE.Points(
		particleGeo,
		particleMat
	);
	return particleSystem;

}

function getOrbitCircle(rx, ry) {
	const curve = new THREE.EllipseCurve(
		0, 0,
		rx, ry,
		0, 2 * Math.PI,
		false,
		0
	);
	const points = curve.getSpacedPoints(50);
	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints(points);
	// const material = new THREE.LineBasicMaterial({ color: 0xc0c0c0 });
	const material = new THREE.LineDashedMaterial({ color: 0xffaa00, dashSize: 2, gapSize: 0.1, linewidth: 0.2 });



	const orbit = new THREE.LineLoop(geometry, material);
	orbit.computeLineDistances();
	orbit.castShadow = false;

	return orbit;

}


function displayPlanetsPositions(scene, planetMoveData) {
	// alert("function to change position of planets based on planetMoveData obtained in getPositionOrbit below function ");
	// alert("draw -> update -> draw -> update")
	// for(let plan in planetMoveData){
	// 	console.log(planetsArray)
	// }
	// console.log(planetMoveData)
	// 	planetsArray[plan].position.x = planetMoveData[plan].x;
	// 	console.log(plan);
	// }
	// console.log(planetsArray.length)



	var merc = scene.getObjectByName("mercury", true);
	merc.position.x = planetMoveData["mercury"].x;
	merc.position.y = planetMoveData["mercury"].y;




}


function getPositionOrbit(planet, a, eccentr, time, displayPlanetsPositions) {


	var M = 10e24;
	var n = Math.sqrt((G * M) / (a * a * a));
	var Mt = n * time;

	// for orbits with eccent > 0.8, E0=pi should be used;
	if (eccentr > 0.8) {
		var E = NumApprox(150, Math.PI, Mt, 10e-15, eccentr);
	}
	else {
		var E = NumApprox(150, Math.PI, Mt, 10e-15, eccentr);
	}

	var true_anom = 2.0 * Math.atan2(Math.sqrt(1.0 + eccentr) *
		Math.sin(E / 2.0),
		Math.sqrt(1.0 - eccentr) *
		Math.cos(E / 2.0));

	var d = a * ((1.0 - eccentr ** 2) / (1.0 + eccentr * Math.cos(true_anom)))

	//Position
	var x = d * Math.cos(true_anom);
	var y = d * Math.sin(true_anom);
	//apply ω
	var w = 0;
	var xx = x * Math.cos(w) - y * Math.sin(w);
	var yy = x * Math.sin(w) + y * Math.cos(w);
	x = xx;
	y = yy;


	//Velocity
	var v = Math.sqrt(G * M * a) / d;
	var vx = -v * Math.sin(E);
	var vy = -v * Math.sqrt(1.0 - eccentr * eccentr) * Math.cos(E);

	planetMoveData[planet].x = x;
	planetMoveData[planet].y = y;
	planetMoveData[planet].speedX = vx;
	planetMoveData[planet].speedY = vy;
	// console.log(planetMoveData["mercury"])
	// console.log(x,y,vx,vy)
	displayPlanetsPositions(scene, planetMoveData);

}

function NumApprox(intr, prev, Mt, err, eccentr) {
	var ret = prev;
	var retprev = prev;
	for (let i = 0; i < intr; i++) {
		retprev = ret;
		ret = ret - (ret - eccentr * Math.sin(ret) - Mt) / (1.0 - eccentr * Math.cos(ret));
		if (Math.abs(ret - retprev) < err)
			break;
	}
	return ret;
}


var scena = init();

function initConfig() {
	scene = new THREE.Scene();
	scene.name = "scene";

	stats = new Stats();

	gui = new dat.GUI();


	// camera
	camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		0.01, // near clipping plane
		100000 // far clipping plane
	);
	camera.position.z = 5;
	camera.position.x = 0;
	camera.position.y = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0));


	document.body.appendChild(stats.dom);


	// helper 
	const axesHelper = new THREE.AxisHelper(50);
	scene.add(axesHelper);


	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	document.getElementById('webgl').appendChild(renderer.domElement);

}

async function readJson(initBodies, update) {

	try {
		const response = await fetch('bodiesData.json');
		if (!response.ok) {
			throw new Error("HTTP error " + response.status);
		}
		const json = await response.json();
		// var data = json;
		// console.log(json)
		initBodies(json);
	} catch (err) {
		console.log("ERRROR" + err);
	}
}


function initBodies(bodiesData) {
	// console.log(bodiesData);
	planetsData = bodiesData["bodies"]["planets"];



	// sun
	var sun = getPointLight(1000);
	var sunSphere = new THREE.Mesh(
		new THREE.SphereGeometry(bodiesData["bodies"]["stars"]["sun"]["radius"] * 20, 24, 24),
		new THREE.MeshBasicMaterial({
			color: "rgb(255,255,255)"
		})
	);

	sunSphere.castShadow = false;
	sunSphere.receiveShadow = false;
	sun.name = 'sun';
	// console.log(sunSphere)

	// Mercury
	// var mercury = getSphere(1.63e-5 * 20000);
	var mercury = getSphere(planetsData["mercury"].radius * 1000)
	mercury.material.color.setHex(0xFFE5CF);
	mercury.name = 'mercury';

	var mercOrbit = getOrbitCircle(planetsData["mercury"].orbitSemimajorRadius, planetsData["mercury"].orbitSemimajorRadius);

	var mercuryGroup = new THREE.Group();
	mercuryGroup.name = "mercuryGroup";
	mercuryGroup.add(mercury);
	mercuryGroup.add(mercOrbit);

	// Venus
	var venus = getSphere(planetsData["venus"].radius * 1000);
	venus.material.color.setHex(0x89E3EE);
	venus.name = 'venus';

	var venusOrbit = getOrbitCircle(planetsData["venus"].orbitSemimajorRadius, planetsData["venus"].orbitSemimajorRadius);


	var venusGroup = new THREE.Group();
	venusGroup.add(venus);
	venusGroup.add(venusOrbit);

	// Earth
	var earth = getSphere(planetsData["earth"].radius * 1000);
	earth.material.color.setHex(0x80ff00);
	earth.name = 'earth';

	var earthOrbit = getOrbitCircle(planetsData["earth"].orbitSemimajorRadius, planetsData["earth"].orbitSemimajorRadius);


	var earthGroup = new THREE.Group();
	earthGroup.add(earth);
	earthGroup.add(earthOrbit);

	// Mars
	var mars = getSphere(planetsData["mars"].radius * 1000);
	mars.material.color.setHex(0xff0000);
	mars.name = 'mars';

	var marsOrbit = getOrbitCircle(planetsData["mars"]["orbitSemimajorRadius"], planetsData["mars"]["orbitSemimajorRadius"]);


	var marsGroup = new THREE.Group();
	marsGroup.add(mars);
	marsGroup.add(marsOrbit);

	// Jupiter
	var jupiter = getSphere(planetsData["jupiter"].radius * 1000);
	jupiter.material.color.setHex(0x994CC0);
	jupiter.name = 'jupiter';

	var jupiterOrbit = getOrbitCircle(planetsData["jupiter"]["orbitSemimajorRadius"], planetsData["jupiter"]["orbitSemimajorRadius"]);


	var jupiterGroup = new THREE.Group();
	jupiterGroup.add(jupiter);
	jupiterGroup.add(jupiterOrbit);

	// Saturn
	var saturn = getSphere(2.26e-5 * 10000);
	saturn.material.color.setHex(0xff8000);
	saturn.name = 'saturn';

	var saturnOrbit = getOrbitCircle(planetsData["saturn"]["orbitSemimajorRadius"], planetsData["saturn"]["orbitSemimajorRadius"]);


	var saturnGroup = new THREE.Group();
	saturnGroup.add(saturn);
	saturnGroup.add(saturnOrbit);

	// Uranus
	var uranus = getSphere(2.26e-5 * 1000);
	uranus.material.color.setHex(0x0000ff);
	uranus.name = 'uranus';

	var uranusOrbit = getOrbitCircle(planetsData["uranus"]["orbitSemimajorRadius"], planetsData["uranus"]["orbitSemimajorRadius"]);


	var uranusGroup = new THREE.Group();
	uranusGroup.add(uranus);
	uranusGroup.add(uranusOrbit);

	// neptune
	var neptune = getSphere(2.26e-5 * 10000);
	neptune.material.color.setHex(0xff00ff);
	neptune.name = 'neptune';

	var neptuneOrbit = getOrbitCircle(planetsData["neptune"]["orbitSemimajorRadius"], planetsData["neptune"]["orbitSemimajorRadius"]);


	var neptuneGroup = new THREE.Group();
	neptuneGroup.add(neptune);
	neptuneGroup.add(neptuneOrbit);

	// pluto
	var pluto = getSphere(2.26e-5 * 1000);
	pluto.material.color.setHex(0xe0e0e0);
	pluto.name = 'pluto';

	var plutoOrbit = getOrbitCircle(planetsData["pluto"]["orbitSemimajorRadius"], planetsData["pluto"]["orbitSemimajorRadius"]);


	var plutoGroup = new THREE.Group();
	plutoGroup.add(pluto);
	plutoGroup.add(plutoOrbit);


	var arrow = new THREE.ArrowHelper(
		// first argument is the direction
		new THREE.Vector3(0, 1, 0).normalize(),
		// second argument is the origin
		new THREE.Vector3(planetsData["earth"].orbitSemimajorRadius, 0, 0),
		// length
		0.5,
		// color
		0x00ff00);

	scene.add(arrow)




	// add planets to array 

	planetsArray.push(mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto)


	sun.add(sunSphere);

	scene.add(sun);
	scene.add(mercuryGroup);
	scene.add(venusGroup);
	scene.add(earthGroup);
	scene.add(marsGroup);
	scene.add(jupiterGroup);
	scene.add(saturnGroup);
	scene.add(uranusGroup);
	scene.add(neptuneGroup);
	scene.add(plutoGroup);
	// scene.add(backgroundStars);

	mercury.position.x = planetsData["mercury"].orbitSemimajorRadius;

	venus.position.x = planetsData["venus"].orbitSemimajorRadius * Math.cos(15);
	venus.position.y = planetsData["venus"].orbitSemimajorRadius * Math.sin(15);
	earth.position.x = planetsData["earth"].orbitSemimajorRadius * Math.cos(Math.PI / 12);
	// add gui controls 
	// gui.add(earth.position,"x",-1,1);
	earth.position.y = planetsData["earth"].orbitSemimajorRadius * Math.sin(Math.PI / 12);
	mars.position.x = planetsData["mars"].orbitSemimajorRadius * Math.cos(40);
	mars.position.y = planetsData["mars"].orbitSemimajorRadius * Math.sin(40);
	jupiter.position.x = planetsData["jupiter"].orbitSemimajorRadius * Math.cos(Math.PI / 8);
	jupiter.position.y = planetsData["jupiter"].orbitSemimajorRadius * Math.cos(Math.PI / 8);
	saturn.position.x = 6 * Math.cos(60);
	saturn.position.y = 6 * Math.sin(60);
	uranus.position.x = 7 * Math.cos(75);
	uranus.position.y = 7 * Math.sin(75);
	neptune.position.x = 8;
	pluto.position.x = 9;

	planetMoveData = planetsData;

	update(renderer, scene, camera, controls, stats, clock, planetMoveData, planetsData)

}