
function stopAnim() {
	console.log(document.getElementsByName("world", true))
	// document.getElementsByName("world").start();
}

function displayBodiesData(planetMoveData,elapsedTime) {
	

	// console.log(planetMoveData)
	
	let planetInfo = document.getElementById("planetInfo");
	planetInfo.innerHTML="";


	planetInfo.innerHTML = `Elapsed time: ${elapsedTime.toFixed(3)}`;
	for (let plan in planetMoveData) {

		planetInfo.innerHTML += `<p>${plan} R=${planetMoveData[plan].orbitSemimajorRadius}
		x: ${Number(planetMoveData[plan].x).toFixed(3)} <br> y: ${Number(planetMoveData[plan].y).toFixed(3)}</p>`
		

	}
	

}

export { stopAnim, displayBodiesData };