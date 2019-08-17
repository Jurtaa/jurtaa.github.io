shapes=0;
shapesPerClick=1;
shapesPerSecond=0;
circleCost=15;
circleCount=0;
function clicked(){
	shapes=shapes+shapesPerClick
	update()
}

function timer(){
	shapes=shapes+(shapesPerSecond/100)
	update()
}
setInterval(timer, 10)

function update(){
	document.getElementById("shapesPerSecond").innerHTML=(Math.round(shapesPerSecond*10)/10)+" Shapes Per Sec"
	document.getElementById("circleCost").innerHTML="Buy Circle - "+circleCost+" Shapes"
	document.getElementById("shapes").innerHTML=(Math.round(shapes*10)/10)+" Shapes"
}

function circle(){
	if (shapes>=circleCost){
		shapes=shapes-circleCost
		shapesPerSecond=shapesPerSecond+0.1
		circleCount=circleCount+1
		circleCost=Math.round(circleCost+(1.15*circleCount))
		update()
	}
	else{
	}
}
