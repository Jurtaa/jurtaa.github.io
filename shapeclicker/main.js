var Game={};

Game.shapes=0;
Game.shapesPerClick=1;
Game.shapesPerSecond=0;
shapesPSRounded=0;

Game.geometryName="Player";

Game.spcMultiCost=2000;
Game.circleCost=10;
Game.circleCount=0;
Game.circleSPS=0;
Game.triangleCost=85;
Game.triangleCount=0;
Game.triangleSPS=0;
Game.rectangleCost=620;
Game.rectangleCount=0;
Game.rectangleSPS=0;
Game.pentagonCost=3200;
Game.pentagonCount=0;
Game.pentagonSPS=0;
Game.hexagonCost=10500;
Game.hexagonCount=0;
Game.hexagonSPS=0;
Game.heptagonCost=120000;
Game.heptagonCount=0;
Game.heptagonSPS=0;
Game.octagonCost=1350000;
Game.octagonCount=0;
Game.octagonSPS=0;
Game.nonagonCost=18500000;
Game.nonagonCount=0;
Game.nonagonSPS=0;
Game.decagonCost=300000000;
Game.decagonCount=0;
Game.decagonSPS=0;
Game.hendecagonCost=4500000000;
Game.hendecagonCount=0;
Game.hendecagonSPS=0;
Game.dodecagonCost=70000000000;
Game.dodecagonCount=0;
Game.dodecagonSPS=0;
Game.tridecagonCost=1000000000000;
Game.tridecagonCount=0;
Game.tridecagonSPS=0;

/*----------SAVING/LOADING SYSTEM----------*/

window.save=function(){
	localStorage.setItem("Game", JSON.stringify(Game));
};

window.wipeSave=function(){
	var commitWipeSave = confirm("Do you REALLY want to wipe your save? You will lose all of your progress.")
	if (commitWipeSave == true){
		var commitSureWipeSave = confirm("Hey there buddy, are you POSITIVELY sure that you want to do this? All of your hard work will be turned into dust if you proceed.")
		if (commitSureWipeSave == true){ 
				localStorage.removeItem("Game")
				location.reload();
		}
		else{
		}
	}
	else{
	}
}

function autoSave(){
	window.save();
}
setInterval(autoSave, 60000)

window.load=function(){
	if (localStorage.getItem("Game")){
		var loading = JSON.parse(localStorage.getItem("Game"));
		Game = loading;
	}
	else{
		window.save()
	}
}
window.load()
update()

/*-----------MAKES NUMBERS PRETTY----------*/

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

/*---------------OTHER STUFF---------------*/

function clicked(){
	Game.shapes=Game.shapes+Game.shapesPerClick
	update()
}

function timer(){
	Game.shapesPerSecond=Game.circleSPS+Game.triangleSPS+Game.rectangleSPS+Game.pentagonSPS+Game.hexagonSPS+Game.heptagonSPS+Game.octagonSPS+Game.nonagonSPS+Game.decagonSPS+Game.hendecagonSPS+Game.dodecagonSPS+Game.tridecagonSPS
	shapesPSRounded=Math.round(Game.shapesPerSecond*10)/10
	Game.shapes=Game.shapes+(Game.shapesPerSecond/25)
	update()
}
setInterval(timer, 40)

function update(){
	document.getElementById("geometryName").innerHTML=Game.geometryName+"'s geometry"
	document.getElementById("shapesPerSecond").innerHTML=numberWithCommas(abbreviate(shapesPSRounded, 2, false, false))+"/s"
	document.getElementById("spcMultiCost").innerHTML="Upgrade your cursor - "+numberWithCommas(abbreviate(Game.spcMultiCost, 2, false, false))+" Shapes"
	document.getElementById("circleCost").innerHTML="Buy Circle - "+numberWithCommas(abbreviate(Game.circleCost, 2, false, false))+" Shapes"
	document.getElementById("triangleCost").innerHTML="Buy Triangle - "+numberWithCommas(abbreviate(Game.triangleCost, 2, false, false))+" Shapes"
	document.getElementById("rectangleCost").innerHTML="Buy Rectangle - "+numberWithCommas(abbreviate(Game.rectangleCost, 2, false, false))+" Shapes"
	document.getElementById("pentagonCost").innerHTML="Buy Pentagon - "+numberWithCommas(abbreviate(Game.pentagonCost, 2, false, false))+" Shapes"
	document.getElementById("hexagonCost").innerHTML="Buy Hexagon - "+numberWithCommas(abbreviate(Game.hexagonCost, 2, false, false))+" Shapes"
	document.getElementById("heptagonCost").innerHTML="Buy Heptagon - "+numberWithCommas(abbreviate(Game.heptagonCost, 2, false, false))+" Shapes"
	document.getElementById("octagonCost").innerHTML="Buy Octagon - "+numberWithCommas(abbreviate(Game.octagonCost, 2, false, false))+" Shapes"
	document.getElementById("nonagonCost").innerHTML="Buy Nonagon - "+numberWithCommas(abbreviate(Game.nonagonCost, 2, false, false))+" Shapes"
	document.getElementById("decagonCost").innerHTML="Buy Decagon - "+numberWithCommas(abbreviate(Game.decagonCost, 2, false, false))+" Shapes"
	document.getElementById("hendecagonCost").innerHTML="Buy Hendecagon - "+numberWithCommas(abbreviate(Game.hendecagonCost, 2, false, false))+" Shapes"
	document.getElementById("dodecagonCost").innerHTML="Buy Dodecagon - "+numberWithCommas(abbreviate(Game.dodecagonCost, 2, false, false))+" Shapes"
	document.getElementById("tridecagonCost").innerHTML="Buy Tridecagon - "+numberWithCommas(abbreviate(Game.tridecagonCost, 2, false, false))+" Shapes"
	document.getElementById("shapes").innerHTML=numberWithCommas(abbreviate(Math.trunc(Game.shapes), 2, false, false))+" Shapes"
}

function updateTitle(){
	document.title=numberWithCommas(abbreviate((Math.trunc(Game.shapes)), 2, false, false))+" Shapes - Shape Clicker"
}
setInterval(updateTitle, 1000)

/*--------------GEOMETRY NAME--------------*/

function nameGeometry(){
	Game.newGeometryName=prompt("Name your geometry.", Game.geometryName);
	if (Game.newGeometryName == null || Game.newGeometryName == ""){
		Game.geometryName=Game.geometryName;
	}
	else {
		Game.geometryName=Game.newGeometryName;
	}
}

/*----------------BUILDINGS----------------*/

function circle(){
	if (Game.shapes>=Game.circleCost){
		Game.shapes=Game.shapes-Game.circleCost
		Game.circleSPS=Game.circleSPS+0.1
		Game.circleCount=Game.circleCount+1
		Game.circleCost=Math.round(Game.circleCost+(1.15*((Game.circleCount*1.5)*2.2)))
		update()
	}
	else{
	}
}

function triangle(){
	if (Game.shapes>=Game.triangleCost){
		Game.shapes=Game.shapes-Game.triangleCost
		Game.triangleSPS=Game.triangleSPS+0.5
		Game.triangleCount=Game.triangleCount+1
		Game.triangleCost=Math.round(Game.triangleCost+(1.15*((Game.triangleCount*1.5)*6.2)))
		update()
	}
	else{
	}
}

function rectangle(){
	if (Game.shapes>=Game.rectangleCost){
		Game.shapes=Game.shapes-Game.rectangleCost
		Game.rectangleSPS=Game.rectangleSPS+3
		Game.rectangleCount=Game.rectangleCount+1
		Game.rectangleCost=Math.round(Game.rectangleCost+(1.15*((Game.rectangleCount*1.5)*32.5)))
		update()
	}
	else{
	}
}

function pentagon(){
	if (Game.shapes>=Game.pentagonCost){
		Game.shapes=Game.shapes-Game.pentagonCost
		Game.pentagonSPS=Game.pentagonSPS+10
		Game.pentagonCount=Game.pentagonCount+1
		Game.pentagonCost=Math.round(Game.pentagonCost+(1.15*((Game.pentagonCount*1.5)*700)))
		update()
	}
	else{
	}
}

function hexagon(){
	if (Game.shapes>=Game.hexagonCost){
		Game.shapes=Game.shapes-Game.hexagonCost
		Game.hexagonSPS=Game.hexagonSPS+32
		Game.hexagonCount=Game.hexagonCount+1
		Game.hexagonCost=Math.round(Game.hexagonCost+(1.15*((Game.hexagonCount*1.5)*2400)))
		update()
	}
	else{
	}
}

function heptagon(){
	if (Game.shapes>=Game.heptagonCost){
		Game.shapes=Game.shapes-Game.heptagonCost
		Game.heptagonSPS=Game.heptagonSPS+240
		Game.heptagonCount=Game.heptagonCount+1
		Game.heptagonCost=Math.round(Game.heptagonCost+(1.15*((Game.heptagonCount*1.5)*42600)))
		update()
	}
	else{
	}
}

function octagon(){
	if (Game.shapes>=Game.octagonCost){
		Game.shapes=Game.shapes-Game.octagonCost
		Game.octagonSPS=Game.octagonSPS+1200
		Game.octagonCount=Game.octagonCount+1
		Game.octagonCost=Math.round(Game.octagonCost+(1.15*((Game.octagonCount*1.5)*280000)))
		update()
	}
	else{
	}
}

function nonagon(){
	if (Game.shapes>=Game.nonagonCost){
		Game.shapes=Game.shapes-Game.nonagonCost
		Game.nonagonSPS=Game.nonagonSPS+7600
		Game.nonagonCount=Game.nonagonCount+1
		Game.nonagonCost=Math.round(Game.nonagonCost+(1.15*((Game.nonagonCount*1.5)*3500000)))
		update()
	}
	else{
	}
}

function decagon(){
	if (Game.shapes>=Game.decagonCost){
		Game.shapes=Game.shapes-Game.decagonCost
		Game.decagonSPS=Game.decagonSPS+42000
		Game.decagonCount=Game.decagonCount+1
		Game.decagonCost=Math.round(Game.decagonCost+(1.15*((Game.decagonCount*1.5)*26500000)))
		update()
	}
	else{
	}
}

function hendecagon(){
	if (Game.shapes>=Game.hendecagonCost){
		Game.shapes=Game.shapes-Game.hendecagonCost
		Game.hendecagonSPS=Game.hendecagonSPS+240000
		Game.hendecagonCount=Game.hendecagonCount+1
		Game.hendecagonCost=Math.round(Game.hendecagonCost+(1.15*((Game.hendecagonCount*1.5)*340000000)))
		update()
	}
	else{
	}
}

function dodecagon(){
	if (Game.shapes>=Game.dodecagonCost){
		Game.shapes=Game.shapes-Game.dodecagonCost
		Game.dodecagonSPS=Game.dodecagonSPS+1500000
		Game.dodecagonCount=Game.dodecagonCount+1
		Game.dodecagonCost=Math.round(Game.dodecagonCost+(1.15*((Game.dodecagonCount*1.5)*4500000000)))
		update()
	}
	else{
	}
}

function tridecagon(){
	if (Game.shapes>=Game.tridecagonCost){
		Game.shapes=Game.shapes-Game.tridecagonCost
		Game.tridecagonSPS=Game.tridecagonSPS+10000000
		Game.tridecagonCount=Game.tridecagonCount+1
		Game.tridecagonCost=Math.round(Game.tridecagonCost+(1.15*((Game.tridecagonCount*1.5)*90000000000)))
		update()
	}
	else{
	}
}

/*-----------------UPGRADES----------------*/

function spcMulti(){
	if (Game.shapes>=Game.spcMultiCost){
		Game.shapes=Game.shapes-Game.spcMultiCost
		Game.shapesPerClick=Game.shapesPerClick*2
		Game.spcMultiCost=Game.spcMultiCost*3
		update()
	}
	else{
	}
}
