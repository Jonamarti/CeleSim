import {getDistance,getPlanetsDistance} from "./orbitFunctions.js";

function init() {
	var scene = new THREE.Scene();
	scene.name="scene";
	var stats = new Stats();

	var gui = new dat.GUI();

	document.body.appendChild(stats.dom);

	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		0.1, // near clipping plane
		10000 // far clipping plane
	);
	camera.position.z = 3000;
	camera.position.x = 0;
	camera.position.y = 0;
	camera.lookAt(new THREE.Vector3(0, 0, 0));



	var sunGeo = new THREE.SphereGeometry(10, 100, 100);
	sunGeo.name="sunGeo";




	// background stars
	// var backgroundStars = getBackgroundStars();
	// backgroundStars.name = 'backgroundStars';

	// sun
	var sun = getPointLight(10);
	var sunSphere = getSphere(0.00465 * 5000);
	sun.name = 'sun';

	// Mercury
	var mercury = getSphere(1.63e-5 * 100000);
	mercury.material.color.setHex(0xFFE5CF);
	mercury.name = 'mercury';
	
	var mercOrbit = getOrbitCircle(100,100);

	var mercuryGroup = new THREE.Group();
	mercuryGroup.add(mercury);
	mercuryGroup.add(mercOrbit);

	// Venus
	var venus = getSphere(4.045e-5 * 100000);
	venus.material.color.setHex(0x89E3EE);
	venus.name = 'venus';

	var venusOrbit = getOrbitCircle(200,200);


	var venusGroup = new THREE.Group();
	venusGroup.add(venus);
	venusGroup.add(venusOrbit);

	// Earth
	var earth = getSphere(4.26e-5 * 100000);
	earth.material.color.setHex(0x80ff00);
	earth.name = 'earth';

	var earthOrbit = getOrbitCircle(300,300);


	var earthGroup = new THREE.Group();
	earthGroup.add(earth);
	earthGroup.add(earthOrbit);

	// Mars
	var mars = getSphere(2.26e-5 * 100000);
	mars.material.color.setHex(0xff0000);
	mars.name = 'mars';

	var marsOrbit = getOrbitCircle(400,400);


	var marsGroup = new THREE.Group();
	marsGroup.add(mars);
	marsGroup.add(marsOrbit);

	// Jupiter
	var jupiter = getSphere(2.26e-5 * 1000000);
	jupiter.material.color.setHex(0x994CC0);
	jupiter.name = 'jupiter';

	var jupiterOrbit = getOrbitCircle(500,500);


	var jupiterGroup = new THREE.Group();
	jupiterGroup.add(jupiter);
	jupiterGroup.add(jupiterOrbit);

	// Saturn
	var saturn = getSphere(2.26e-5 * 1000000);
	saturn.material.color.setHex(0xff8000);
	saturn.name = 'saturn';

	var saturnOrbit = getOrbitCircle(600,600);


	var saturnGroup = new THREE.Group();
	saturnGroup.add(saturn);
	saturnGroup.add(saturnOrbit);

	// Uranus
	var uranus = getSphere(2.26e-5 * 1000000);
	uranus.material.color.setHex(0x0000ff);
	uranus.name = 'uranus';

	var uranusOrbit = getOrbitCircle(700,700);


	var uranusGroup = new THREE.Group();
	uranusGroup.add(uranus);
	uranusGroup.add(uranusOrbit);

	// neptune
	var neptune = getSphere(2.26e-5 * 1000000);
	neptune.material.color.setHex(0xff00ff);
	neptune.name = 'neptune';

	var neptuneOrbit = getOrbitCircle(800,800);


	var neptuneGroup = new THREE.Group();
	neptuneGroup.add(neptune);
	neptuneGroup.add(neptuneOrbit);

	// pluto
	var pluto = getSphere(2.26e-5 * 1000000);
	pluto.material.color.setHex(0xe0e0e0);
	pluto.name = 'pluto';

	var plutoOrbit = getOrbitCircle(900,400);


	var plutoGroup = new THREE.Group();
	plutoGroup.add(pluto);
	plutoGroup.add(plutoOrbit);


	// add planets to array 
	var planetsArray = [];
	planetsArray.push(mercury,venus,earth,mars,jupiter,saturn,uranus,neptune,pluto)


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


	// helper 
	const axesHelper = new THREE.AxisHelper(500);
	scene.add(axesHelper);


	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor('rgb(20, 20, 20)');

	var controls = new THREE.OrbitControls(camera, renderer.domElement);

	document.getElementById('webgl').appendChild(renderer.domElement);

	// Add gui controls 

	// gui.add(sun.position,'x',-10,10);
	// gui.add(sun.position,'y',-1,1);
	// gui.add(sun.position,'z',-0.1,0.1);

	// gui.add(sun.rotation,'x',0,5);
	// gui.add(sun.rotation,'y',0,5);
	// gui.add(sun.rotation,'z',0,5);

	// gui.add(sun.scale,'x',0.001,10)

	mercury.position.x = 100;
	// mercury.position.y = 1;
	venus.position.x = 200;
	earth.position.x = 300*Math.cos(45);
	earth.position.y = 300*Math.sin(45);
	mars.position.x = 400;
	jupiter.position.x = 500;
	saturn.position.x = 600;
	uranus.position.x = 700;
	neptune.position.x = 800;
	pluto.position.x = 900;

	update(renderer, scene, camera, controls, stats);
	// getDistance(mercury);
	
	var distancesArray = getPlanetsDistance(planetsArray);
	let planetInfo = document.getElementById("planetInfo");
	for(let plan in distancesArray){
		planetInfo.innerHTML+= `<p>${plan}=${distancesArray[plan]}</p>`;
	}


	return scene;
}


function update(renderer, scene, camera, controls, stats) {
	controls.update();
	stats.update();

	renderer.render(scene, camera);

	// var sun = scene.getObjectByName('sun');
	// sun.rotation.y += 0.0005;

	requestAnimationFrame(function () {
		update(renderer, scene, camera, controls, stats);
	});
}

var scene = init();


function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
	);

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

function getOrbitCircle(rx,ry) {
	const curve = new THREE.EllipseCurve(
		0,0,
		rx,ry,
		0,2*Math.PI,
		false,
		0
	);
	const points = curve.getSpacedPoints(50);
	const geometry = new THREE.BufferGeometry();
	geometry.setFromPoints( points );
	// const material = new THREE.LineBasicMaterial({ color: 0xc0c0c0 });
	const material = new THREE.LineDashedMaterial({color: 0xffaa00, dashSize: 2, gapSize: 10, linewidth: 0.2});
	
	
	
	const orbit = new THREE.LineLoop(geometry, material);
	orbit.computeLineDistances();
	
	return orbit;

}


function displayPlanetsPositions(){
	alert("h")
}


