shapes=0;
shapesPerClick=1;
shapesPerSecond=0;
circleCost=10;
circleCount=0;
circleSPS=0;
triangleCost=50;
triangleCount=0;
triangleSPS=0;
rectangleCost=150;
rectangleCount=0;
rectangleSPS=0;
pentagonCost=1325;
pentagonCount=0;
pentagonSPS=0;
function clicked(){
	shapes=shapes+shapesPerClick
	update()
}

function timer(){
	shapesPerSecond=circleSPS+triangleSPS+rectangleSPS+pentagonSPS
	shapes=shapes+(shapesPerSecond/100)
	update()
}
setInterval(timer, 10)

function update(){
	document.getElementById("shapesPerSecond").innerHTML=(Math.round(shapesPerSecond*10)/10)+"/s"
	document.getElementById("circleCost").innerHTML="Buy Circle - "+circleCost+" Shapes"
	document.getElementById("triangleCost").innerHTML="Buy Triangle - "+triangleCost+" Shapes"
	document.getElementById("rectangleCost").innerHTML="Buy Rectangle - "+rectangleCost+" Shapes"
	document.getElementById("pentagonCost").innerHTML="Buy Pentagon - "+pentagonCost+" Shapes"
	document.getElementById("shapes").innerHTML=(Math.round(shapes))+" Shapes"
}

function circle(){
	if (shapes>=circleCost){
		shapes=shapes-circleCost
		circleSPS=circleSPS+0.1
		circleCount=circleCount+1
		circleCost=Math.round(circleCost+(1.15*((circleCount*2)*1.2)))
		update()
	}
	else{
	}
}

function triangle(){
	if (shapes>=triangleCost){
		shapes=shapes-triangleCost
		triangleSPS=triangleSPS+0.5
		triangleCount=triangleCount+1
		triangleCost=Math.round(triangleCost+(1.15*((triangleCount*2)*3.2)))
		update()
	}
	else{
	}
}

function rectangle(){
	if (shapes>=rectangleCost){
		shapes=shapes-rectangleCost
		rectangleSPS=rectangleSPS+1
		rectangleCount=rectangleCount+1
		rectangleCost=Math.round(rectangleCost+(1.15*((rectangleCount*2)*7.5)))
		update()
	}
	else{
	}
}

function pentagon(){
	if (shapes>=pentagonCost){
		shapes=shapes-pentagonCost
		pentagonSPS=pentagonSPS+5
		pentagonCount=pentagonCount+1
		pentagonCost=Math.round(pentagonCost+(1.15*((pentagonCount*2)*14.2)))
		update()
	}
	else{
	}
}
