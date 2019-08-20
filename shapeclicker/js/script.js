shapes=0;
shapesPerClick=1;
shapesPerSecond=0;
circleCost=10;
circleCount=0;
circleSPS=0;
triangleCost=85;
triangleCount=0;
triangleSPS=0;
rectangleCost=620;
rectangleCount=0;
rectangleSPS=0;
pentagonCost=3200;
pentagonCount=0;
pentagonSPS=0;
hexagonCost=10500;
hexagonCount=0;
hexagonSPS=0;
heptagonCost=120000;
heptagonCount=0;
heptagonSPS=0;
function clicked(){
	shapes=shapes+shapesPerClick
	update()
}

function timer(){
	shapesPerSecond=circleSPS+triangleSPS+rectangleSPS+pentagonSPS+hexagonSPS+heptagonSPS
	shapes=shapes+(shapesPerSecond/25)
	update()
}
setInterval(timer, 40)

function update(){
	document.getElementById("shapesPerSecond").innerHTML=(Math.round(shapesPerSecond*10)/10)+"/s"
	document.getElementById("circleCost").innerHTML="Buy Circle - "+circleCost+" Shapes"
	document.getElementById("triangleCost").innerHTML="Buy Triangle - "+triangleCost+" Shapes"
	document.getElementById("rectangleCost").innerHTML="Buy Rectangle - "+rectangleCost+" Shapes"
	document.getElementById("pentagonCost").innerHTML="Buy Pentagon - "+pentagonCost+" Shapes"
	document.getElementById("hexagonCost").innerHTML="Buy Hexagon - "+hexagonCost+" Shapes"
	document.getElementById("heptagonCost").innerHTML="Buy Heptagon - "+heptagonCost+" Shapes"
	document.getElementById("shapes").innerHTML=(Math.round(shapes))+" Shapes"
}

function updateTitle(){
	document.title=(Math.round(shapes))+" Shapes"
}
setInterval(updateTitle, 1000)


function circle(){
	if (shapes>=circleCost){
		shapes=shapes-circleCost
		circleSPS=circleSPS+0.1
		circleCount=circleCount+1
		circleCost=Math.round(circleCost+(1.15*((circleCount*1.5)*1.2)))
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
		triangleCost=Math.round(triangleCost+(1.15*((triangleCount*1.5)*3.2)))
		update()
	}
	else{
	}
}

function rectangle(){
	if (shapes>=rectangleCost){
		shapes=shapes-rectangleCost
		rectangleSPS=rectangleSPS+3
		rectangleCount=rectangleCount+1
		rectangleCost=Math.round(rectangleCost+(1.15*((rectangleCount*1.5)*8.5)))
		update()
	}
	else{
	}
}

function pentagon(){
	if (shapes>=pentagonCost){
		shapes=shapes-pentagonCost
		pentagonSPS=pentagonSPS+10
		pentagonCount=pentagonCount+1
		pentagonCost=Math.round(pentagonCost+(1.15*((pentagonCount*1.5)*50)))
		update()
	}
	else{
	}
}

function hexagon(){
	if (shapes>=hexagonCost){
		shapes=shapes-hexagonCost
		hexagonSPS=hexagonSPS+32
		hexagonCount=hexagonCount+1
		hexagonCost=Math.round(hexagonCost+(1.15*((hexagonCount*1.5)*600)))
		update()
	}
	else{
	}
}

function heptagon(){
	if (shapes>=heptagonCost){
		shapes=shapes-heptagonCost
		heptagonSPS=heptagonSPS+216
		heptagonCount=heptagonCount+1
		heptagonCost=Math.round(heptagonCost+(1.15*((heptagonCount*1.5)*1400)))
		update()
	}
	else{
	}
}
