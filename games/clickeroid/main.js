var Game={
	gold: 0,
	goldPS: 0,
	goldPC: 1,
	buildings: {
		cursor: {
			name: 'Cursor',
			cost: 15,
			baseCost: 15,
			gps: 0,
			baseGps: 0.1,
			count: 0,
		},
		miner: {
			name: 'Miner',
			cost: 125,
			baseCost: 125,
			gps: 0,
			baseGps: 0.5,
			count: 0,
		},
		satellite: {
			name: 'Satellite',
			cost: 1650,
			baseCost: 1650,
			gps: 0,
			baseGps: 5,
			count: 0,
		},
		tnt: {
			name: 'Trinitrotoluene',
			cost: 17500,
			baseCost: 17500,
			gps: 0,
			baseGps: 50,
			count: 0,
		},
		drill: {
			name: 'Drill',
			cost: 145000,
			baseCost: 145000,
			gps: 0,
			baseGps: 126,
			count: 0,
		},
		rtlr: {
			name: 'Rocket Launcher',
			cost: 1260000,
			baseCost: 1260000,
			gps: 0,
			baseGps: 1048,
			count: 0,
		},
	},
	prefs: {
		format: 0,
	},
	statistics: {
		goldHand: 0,
		goldNoHand: 0,
		goldTotal: 0,
		buildingsOwned: 0,
	},
};

/*----------SAVING/LOADING SYSTEM----------*/

window.save=function(){
	localStorage.setItem("clickeroidSave", JSON.stringify(Game));
};

window.wipeSave=function(){
	var commitWipeSave = confirm("Do you REALLY want to wipe your save? You will lose all of your progress.")
	if (commitWipeSave == true){
		var commitSureWipeSave = confirm("Are you sure? You won't be able to revert this once you've proceeded.")
		if (commitSureWipeSave == true){ 
				localStorage.removeItem("clickeroidSave")
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
	if (localStorage.getItem("clickeroidSave")){
		var loading = JSON.parse(localStorage.getItem("clickeroidSave"));
		Game = loading;
	}
	else{
		window.save()
	}
}
window.load()

//Beautify and number-formatting adapted from the Frozen Cookies add-on (http://cookieclicker.wikia.com/wiki/Frozen_Cookies_%28JavaScript_Add-on%29)
function formatEveryThirdPower(notations)
{
	return function (value)
	{
		var base = 0,
		notationValue = '';
		if (!isFinite(value)) return 'Infinity';
		if (value >= 1000000)
		{
			value /= 1000;
			while(Math.round(value) >= 1000)
			{
				value /= 1000;
				base++;
			}
			if (base >= notations.length) {return 'Infinity';} else {notationValue = notations[base];}
		}
		return ( Math.round(value * 1000) / 1000 ) + notationValue;
	};
}

function rawFormatter(value) {return Math.round(value * 1000) / 1000;}

var formatLong=[' thousand',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'];
var prefixes=['','un','duo','tre','quattuor','quin','sex','septen','octo','novem'];
var suffixes=['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion'];
for (var i in suffixes)
{
	for (var ii in prefixes)
	{
		formatLong.push(' '+prefixes[ii]+suffixes[i]);
	}
}

var formatShort=['k','M','B','T','Qa','Qi','Sx','Sp','Oc','No'];
var prefixes=['','Un','Do','Tr','Qa','Qi','Sx','Sp','Oc','No'];
var suffixes=['D','V','T','Qa','Qi','Sx','Sp','O','N'];
for (var i in suffixes)
{
	for (var ii in prefixes)
	{
		formatShort.push(' '+prefixes[ii]+suffixes[i]);
	}
}
formatShort[10]='Dc';


var numberFormatters =
[
	formatEveryThirdPower(formatShort),
	formatEveryThirdPower(formatLong),
	rawFormatter
];
function Beautify(value,floats)
{
	var negative=(value<0);
	var decimal='';
	var fixed=value.toFixed(floats);
	if (Math.abs(value)<1000 && floats>0 && Math.floor(fixed)!=fixed) decimal='.'+(fixed.toString()).split('.')[1];
	value=Math.floor(Math.abs(value));
	if (floats>0 && fixed==value+1) value++;
	var formatter=numberFormatters[Game.prefs.format?2:1];
	var output=formatter(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	if (output=='0') negative=false;
	return negative?'-'+output:output+decimal;
}
function shortenNumber(value)
{
	//if no scientific notation, return as is, else :
	//keep only the 5 first digits (plus dot), round the rest
	//may or may not work properly
	if (value >= 1000000 && isFinite(value))
	{
		var num=value.toString();
		var ind=num.indexOf('e+');
		if (ind==-1) return value;
		var str='';
		for (var i=0;i<ind;i++)
		{
			str+=(i<6?num[i]:'0');
		}
		str+='e+';
		str+=num.split('e+')[1];
		return parseFloat(str);
	}
	return value;
}

/*------------SOME GAME MECHANICS----------*/

function update(){
	document.getElementById("gold").innerHTML=Beautify(Game.gold, 0)+" gold"
	document.getElementById("goldPS").innerHTML=Beautify(Game.goldPS, 1)+"/s"
}

function statisticsUpdate(){
	document.getElementById("goldHand").innerHTML="<b>Gold mined (clicking):</b> <moni></moni>" + Beautify(Game.statistics.goldHand, 0)
	document.getElementById("goldNoHand").innerHTML="<b>Gold mined (buildings):</b> <moni></moni>" + Beautify(Game.statistics.goldNoHand, 0)
	document.getElementById("goldTotal").innerHTML="<b>Gold mined (total):</b> <moni></moni>" + Beautify(Game.statistics.goldTotal, 0)
	document.getElementById("buildingsOwned").innerHTML="<b>Buildings owned:</b> " + Beautify(Game.statistics.buildingsOwned, 0)
}

function buildingsUpdate(){
	document.getElementById("cursorPrice").innerHTML="<moni></moni>" + Beautify(Game.buildings.cursor.cost, 0)
	document.getElementById("cursorCount").innerHTML=Beautify(Game.buildings.cursor.count, 0)
	document.getElementById("minerPrice").innerHTML="<moni></moni>" + Beautify(Game.buildings.miner.cost, 0)
	document.getElementById("minerCount").innerHTML=Beautify(Game.buildings.miner.count, 0)
	document.getElementById("satellitePrice").innerHTML="<moni></moni>" + Beautify(Game.buildings.satellite.cost, 0)
	document.getElementById("satelliteCount").innerHTML=Beautify(Game.buildings.satellite.count, 0)
	document.getElementById("tntPrice").innerHTML="<moni></moni>" + Beautify(Game.buildings.tnt.cost, 0)
	document.getElementById("tntCount").innerHTML=Beautify(Game.buildings.tnt.count, 0)
	document.getElementById("drillPrice").innerHTML="<moni></moni>" + Beautify(Game.buildings.drill.cost, 0)
	document.getElementById("drillCount").innerHTML=Beautify(Game.buildings.drill.count, 0)
	document.getElementById("rtlrPrice").innerHTML="<moni></moni>" + Beautify(Game.buildings.rtlr.cost, 0)
	document.getElementById("rtlrCount").innerHTML=Beautify(Game.buildings.rtlr.count, 0)
}

function timer(){
	Game.goldPS=Game.buildings.cursor.gps+Game.buildings.miner.gps+Game.buildings.satellite.gps+Game.buildings.tnt.gps+Game.buildings.drill.gps+Game.buildings.rtlr.gps
	Game.statistics.buildingsOwned=Game.buildings.cursor.count+Game.buildings.miner.count+Game.buildings.satellite.count+Game.buildings.tnt.count+Game.buildings.drill.count+Game.buildings.rtlr.count
	Game.statistics.goldTotal=Game.statistics.goldHand+Game.statistics.goldNoHand
	Game.gold=Game.gold+(Game.goldPS/30)
	Game.statistics.goldNoHand=Game.statistics.goldNoHand+(Game.goldPS/30)
	update()
	buildingsUpdate()
}
setInterval(timer, 33.3)

function delayTimer(){
	document.title=Beautify(Game.gold, 0)+" gold - Clickeroid"
	statisticsUpdate()
}
setInterval(delayTimer, 1000)

function clicked(){
	Game.gold=Game.gold+Game.goldPC
	Game.statistics.goldHand=Game.statistics.goldHand+Game.goldPC
	update()
}

/*----------------BUILDINGS----------------*/

function buyCursor(){
	if (Game.gold>=Game.buildings.cursor.cost){
		Game.gold=Game.gold-Game.buildings.cursor.cost
		Game.buildings.cursor.gps=Game.buildings.cursor.gps+Game.buildings.cursor.baseGps
		Game.buildings.cursor.count=Game.buildings.cursor.count+1
		Game.buildings.cursor.cost=Game.buildings.cursor.baseCost*(Math.pow(1.15, Game.buildings.cursor.count))
		update()
	}
	else{
	}
}

function buyMiner(){
	if (Game.gold>=Game.buildings.miner.cost){
		Game.gold=Game.gold-Game.buildings.miner.cost
		Game.buildings.miner.gps=Game.buildings.miner.gps+Game.buildings.miner.baseGps
		Game.buildings.miner.count=Game.buildings.miner.count+1
		Game.buildings.miner.cost=Game.buildings.miner.baseCost*(Math.pow(1.15, Game.buildings.miner.count))
		update()
	}
	else{
	}
}

function buySatellite(){
	if (Game.gold>=Game.buildings.satellite.cost){
		Game.gold=Game.gold-Game.buildings.satellite.cost
		Game.buildings.satellite.gps=Game.buildings.satellite.gps+Game.buildings.satellite.baseGps
		Game.buildings.satellite.count=Game.buildings.satellite.count+1
		Game.buildings.satellite.cost=Game.buildings.satellite.baseCost*(Math.pow(1.15, Game.buildings.satellite.count))
		update()
	}
	else{
	}
}

function buyTNT(){
	if (Game.gold>=Game.buildings.tnt.cost){
		Game.gold=Game.gold-Game.buildings.tnt.cost
		Game.buildings.tnt.gps=Game.buildings.tnt.gps+Game.buildings.tnt.baseGps
		Game.buildings.tnt.count=Game.buildings.tnt.count+1
		Game.buildings.tnt.cost=Game.buildings.tnt.baseCost*(Math.pow(1.15, Game.buildings.tnt.count))
		update()
	}
	else{
	}
}

function buyDrill(){
	if (Game.gold>=Game.buildings.drill.cost){
		Game.gold=Game.gold-Game.buildings.drill.cost
		Game.buildings.drill.gps=Game.buildings.drill.gps+Game.buildings.drill.baseGps
		Game.buildings.drill.count=Game.buildings.drill.count+1
		Game.buildings.drill.cost=Game.buildings.drill.baseCost*(Math.pow(1.15, Game.buildings.drill.count))
		update()
	}
	else{
	}
}

function buyRtlr(){
	if (Game.gold>=Game.buildings.rtlr.cost){
		Game.gold=Game.gold-Game.buildings.rtlr.cost
		Game.buildings.rtlr.gps=Game.buildings.rtlr.gps+Game.buildings.rtlr.baseGps
		Game.buildings.rtlr.count=Game.buildings.rtlr.count+1
		Game.buildings.rtlr.cost=Game.buildings.rtlr.baseCost*(Math.pow(1.15, Game.buildings.rtlr.count))
		update()
	}
	else{
	}
}