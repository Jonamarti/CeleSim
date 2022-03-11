
function stopAnim() {
	console.log(document.getElementsByName("world", true))
	// document.getElementsByName("world").start();
}

function displayBodiesData(planetMoveData,elapsedTime) {
	

	let planetInfo = document.getElementById("planetInfo");


	planetInfo.innerHTML = `Elapsed time: ${elapsedTime.toFixed(3)}`;
	for (let plan in planetMoveData) {

		planetInfo.innerHTML += `<p>${plan} R=${planetMoveData[plan].orbitSemimajorRadius}
		x: ${planetMoveData[plan].x}, y: ${planetMoveData[plan].y}</p>`
		

	}
	

}

export { stopAnim, displayBodiesData };