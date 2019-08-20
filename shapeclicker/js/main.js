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

function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
	number = Number(number)
	forceLetter = forceLetter || false
	if(forceLetter !== false) {
		return annotate(number, maxPlaces, forcePlaces, forceLetter)
	}
	var abbr
	if(number >= 1e18) {
		abbr = 'Q'
	}
	else if(number >= 1e15) {
		abbr = 'q'
	}
	else if(number >= 1e12) {
		abbr = 't'
	}
	else if(number >= 1e9) {
		abbr = 'B'
	}
	else if(number >= 1e6) {
		abbr = 'M'
	}
	else {
		abbr = ''
	}
	return annotate(number, maxPlaces, forcePlaces, abbr)
}

function annotate(number, maxPlaces, forcePlaces, abbr) {
	var rounded = 0
	switch(abbr) {
		case 'Q':
			rounded = number / 1e18
			break
		case 'q':
			rounded = number / 1e15
			break
		case 't':
			rounded = number / 1e12
			break
		case 'B':
			rounded = number / 1e9
			break
		case 'M':
			rounded = number / 1e6
			break
		case '':
			rounded = number
			break
	}
	if(maxPlaces !== false) {
		var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
		if(test.test(('' + rounded))) {
			rounded = rounded.toFixed(maxPlaces)
		}
	}
	if(forcePlaces !== false) {
		rounded = Number(rounded).toFixed(forcePlaces)
	}
	return rounded + abbr
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
	document.getElementById("shapesPerSecond").innerHTML=numberWithCommas(abbreviate((Math.round(shapesPerSecond*10)), 2, false, false)/10)+"/s"
	document.getElementById("circleCost").innerHTML="Buy Circle - "+numberWithCommas(abbreviate(circleCost, 2, false, false))+" Shapes"
	document.getElementById("triangleCost").innerHTML="Buy Triangle - "+numberWithCommas(abbreviate(triangleCost, 2, false, false))+" Shapes"
	document.getElementById("rectangleCost").innerHTML="Buy Rectangle - "+numberWithCommas(abbreviate(rectangleCost, 2, false, false))+" Shapes"
	document.getElementById("pentagonCost").innerHTML="Buy Pentagon - "+numberWithCommas(abbreviate(pentagonCost, 2, false, false))+" Shapes"
	document.getElementById("hexagonCost").innerHTML="Buy Hexagon - "+numberWithCommas(abbreviate(hexagonCost, 2, false, false))+" Shapes"
	document.getElementById("heptagonCost").innerHTML="Buy Heptagon - "+numberWithCommas(abbreviate(heptagonCost, 2, false, false))+" Shapes"
	document.getElementById("shapes").innerHTML=numberWithCommas(abbreviate((Math.round(shapes)), 2, false, false))+" Shapes"
}

function updateTitle(){
	document.title=numberWithCommas(abbreviate((Math.round(shapes)), 2, false, false))+" Shapes"
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
