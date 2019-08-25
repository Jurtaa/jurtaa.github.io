shapes=0;
shapesPerClick=1;
shapesPerSecond=0;
shapesPSRounded=0;

spcMultiCost=2000;
spcMultiplier=0;

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

octagonCost=1350000;
octagonCount=0;
octagonSPS=0;

nonagonCost=18500000;
nonagonCount=0;
nonagonSPS=0;

decagonCost=300000000;
decagonCount=0;
decagonSPS=0;

hendecagonCost=4500000000;
hendecagonCount=0;
hendecagonSPS=0;

dodecagonCost=70000000000;
dodecagonCount=0;
dodecagonSPS=0;

tridecagonCost=1000000000000;
tridecagonCount=0;
tridecagonSPS=0;

function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
	number = Number(number)
	forceLetter = forceLetter || false
	if(forceLetter !== false) {
		return annotate(number, maxPlaces, forcePlaces, forceLetter)
	}
	var abbr
	if(number >= 1e27) {
		abbr = 'Oc'
	}
	else if(number >= 1e24) {
		abbr = 'Sp'
	}
	else if(number >= 1e21) {
		abbr = 'Sx'
	}
	else if(number >= 1e18) {
		abbr = 'Qi'
	}
	else if(number >= 1e15) {
		abbr = 'Qa'
	}
	else if(number >= 1e12) {
		abbr = 'T'
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
		case 'Oc':
			rounded = number / 1e27
			break
		case 'Sp':
			rounded = number / 1e24
			break
		case 'Sx':
			rounded = number / 1e21
			break
		case 'Qi':
			rounded = number / 1e18
			break
		case 'Qa':
			rounded = number / 1e15
			break
		case 'T':
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
	shapesPerSecond=circleSPS+triangleSPS+rectangleSPS+pentagonSPS+hexagonSPS+heptagonSPS+octagonSPS+nonagonSPS+decagonSPS+hendecagonSPS+dodecagonSPS+tridecagonSPS
	shapesPSRounded=Math.round(shapesPerSecond*10)/10
	shapes=shapes+(shapesPerSecond/25)
	update()
}
setInterval(timer, 40)

function update(){
	document.getElementById("shapesPerSecond").innerHTML=numberWithCommas(abbreviate(shapesPSRounded, 2, false, false))+"/s"
	document.getElementById("spcMultiCost").innerHTML="Upgrade your cursor - "+numberWithCommas(abbreviate(spcMultiCost, 2, false, false))+" Shapes"
	document.getElementById("circleCost").innerHTML="Buy Circle - "+numberWithCommas(abbreviate(circleCost, 2, false, false))+" Shapes"
	document.getElementById("triangleCost").innerHTML="Buy Triangle - "+numberWithCommas(abbreviate(triangleCost, 2, false, false))+" Shapes"
	document.getElementById("rectangleCost").innerHTML="Buy Rectangle - "+numberWithCommas(abbreviate(rectangleCost, 2, false, false))+" Shapes"
	document.getElementById("pentagonCost").innerHTML="Buy Pentagon - "+numberWithCommas(abbreviate(pentagonCost, 2, false, false))+" Shapes"
	document.getElementById("hexagonCost").innerHTML="Buy Hexagon - "+numberWithCommas(abbreviate(hexagonCost, 2, false, false))+" Shapes"
	document.getElementById("heptagonCost").innerHTML="Buy Heptagon - "+numberWithCommas(abbreviate(heptagonCost, 2, false, false))+" Shapes"
	document.getElementById("octagonCost").innerHTML="Buy Octagon - "+numberWithCommas(abbreviate(octagonCost, 2, false, false))+" Shapes"
	document.getElementById("nonagonCost").innerHTML="Buy Nonagon - "+numberWithCommas(abbreviate(nonagonCost, 2, false, false))+" Shapes"
	document.getElementById("decagonCost").innerHTML="Buy Decagon - "+numberWithCommas(abbreviate(decagonCost, 2, false, false))+" Shapes"
	document.getElementById("hendecagonCost").innerHTML="Buy Hendecagon - "+numberWithCommas(abbreviate(hendecagonCost, 2, false, false))+" Shapes"
	document.getElementById("dodecagonCost").innerHTML="Buy Dodecagon - "+numberWithCommas(abbreviate(dodecagonCost, 2, false, false))+" Shapes"
	document.getElementById("tridecagonCost").innerHTML="Buy Tridecagon - "+numberWithCommas(abbreviate(tridecagonCost, 2, false, false))+" Shapes"
	document.getElementById("shapes").innerHTML=numberWithCommas(abbreviate(Math.trunc(shapes), 2, false, false))+" Shapes"
}

function updateTitle(){
	document.title=numberWithCommas(abbreviate((Math.trunc(shapes)), 2, false, false))+" Shapes"
}
setInterval(updateTitle, 1000)

function spcMulti(){
	if (shapes>=spcMultiCost){
		shapes=shapes-spcMultiCost
		shapesPerClick=shapesPerClick*2
		spcMultiCost=spcMultiCost*3
		update()
	}
	else{
	}
}

function circle(){
	if (shapes>=circleCost){
		shapes=shapes-circleCost
		circleSPS=circleSPS+0.1
		circleCount=circleCount+1
		circleCost=Math.round(circleCost+(1.15*((circleCount*1.5)*2.2)))
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
		triangleCost=Math.round(triangleCost+(1.15*((triangleCount*1.5)*6.2)))
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
		rectangleCost=Math.round(rectangleCost+(1.15*((rectangleCount*1.5)*32.5)))
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
		pentagonCost=Math.round(pentagonCost+(1.15*((pentagonCount*1.5)*700)))
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
		hexagonCost=Math.round(hexagonCost+(1.15*((hexagonCount*1.5)*2400)))
		update()
	}
	else{
	}
}

function heptagon(){
	if (shapes>=heptagonCost){
		shapes=shapes-heptagonCost
		heptagonSPS=heptagonSPS+240
		heptagonCount=heptagonCount+1
		heptagonCost=Math.round(heptagonCost+(1.15*((heptagonCount*1.5)*42600)))
		update()
	}
	else{
	}
}

function octagon(){
	if (shapes>=octagonCost){
		shapes=shapes-octagonCost
		octagonSPS=octagonSPS+1200
		octagonCount=octagonCount+1
		octagonCost=Math.round(octagonCost+(1.15*((octagonCount*1.5)*280000)))
		update()
	}
	else{
	}
}

function nonagon(){
	if (shapes>=nonagonCost){
		shapes=shapes-nonagonCost
		nonagonSPS=nonagonSPS+7600
		nonagonCount=nonagonCount+1
		nonagonCost=Math.round(nonagonCost+(1.15*((nonagonCount*1.5)*3500000)))
		update()
	}
	else{
	}
}

function decagon(){
	if (shapes>=decagonCost){
		shapes=shapes-decagonCost
		decagonSPS=decagonSPS+42000
		decagonCount=decagonCount+1
		decagonCost=Math.round(decagonCost+(1.15*((decagonCount*1.5)*26500000)))
		update()
	}
	else{
	}
}

function hendecagon(){
	if (shapes>=hendecagonCost){
		shapes=shapes-hendecagonCost
		hendecagonSPS=hendecagonSPS+240000
		hendecagonCount=hendecagonCount+1
		hendecagonCost=Math.round(hendecagonCost+(1.15*((hendecagonCount*1.5)*340000000)))
		update()
	}
	else{
	}
}

function dodecagon(){
	if (shapes>=dodecagonCost){
		shapes=shapes-dodecagonCost
		dodecagonSPS=dodecagonSPS+1500000
		dodecagonCount=dodecagonCount+1
		dodecagonCost=Math.round(dodecagonCost+(1.15*((dodecagonCount*1.5)*4500000000)))
		update()
	}
	else{
	}
}

function tridecagon(){
	if (shapes>=tridecagonCost){
		shapes=shapes-tridecagonCost
		tridecagonSPS=tridecagonSPS+10000000
		tridecagonCount=tridecagonCount+1
		tridecagonCost=Math.round(tridecagonCost+(1.15*((tridecagonCount*1.5)*90000000000)))
		update()
	}
	else{
	}
}
