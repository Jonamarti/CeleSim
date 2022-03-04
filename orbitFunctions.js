function getDistance(obj){
	let distance;
	var xpos = obj.position.x;
	var ypos = obj.position.y;
	var zpos = obj.position.z;
	distance = Math.sqrt(xpos**2 + ypos**2 + zpos**2);
	return distance;
}

function getPlanetsDistance(array){
	let distances={};
	array.forEach(element => {
		distances[element.name]=getDistance(element);
	});
	
	return distances;
}

export {getDistance,getPlanetsDistance};