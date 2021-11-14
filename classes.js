
// CLASSES
class Player {
	constructor(name) {
		this.name = name;
		this.position = 0;
		this.money = 1500;
		this.jailCards = 0;
		this.jailTurns = 0;
		this.inJail = false;
		this.hasLost = false;
	}
	logInfo() {
		console.log(this.name);
		console.log(this.position);
		console.log(this.money);
		console.log(this.jailCards);
		console.log(this.jailTurns);
		console.log(this.inJail);
		console.log(this.hasLost);
	}
}

class Property {
	constructor(name, cost, houseCost, rent) {
		this.name = name;
		this.cost = cost;
		this.houseCost = houseCost;
		this.rent = rent;
		this.development = 0;
		this.ownedBy = -1;
		this.isMonopoly = false;
		this.isMortgaged = false;
	}
	logInfo() {
		console.log(this.name);
		console.log(this.cost);
		console.log(this.houseCost);
		console.log(this.rent);
		console.log(this.development);
		console.log(this.ownedBy);
		console.log(this.isMonopoly);
		console.log(this.isMortgaged);
	}
	checkMonopoly(pairNum, pair1Property, pair2Property) {
		if (pairNum == 2) {
			if (!this.isMonopoly && properties[pair1Property].ownedBy == activePlayer && this.ownedBy == activePlayer){
				properties[pair1Property].isMonopoly = this.isMonopoly = true;
				console.log("Monopoly!");
				document.getElementById('log').innerHTML += "<p>Monopoly!</p>";
				updateScroll();
			}
		} else if (pairNum == 3) {
			if (!this.isMonopoly && this.ownedBy == activePlayer && properties[pair1Property].ownedBy == activePlayer && properties[pair2Property].ownedBy == activePlayer){
				this.isMonopoly = properties[pair1Property].isMonopoly = properties[pair2Property].isMonopoly = true;
				console.log("Monopoly!");
				document.getElementById('log').innerHTML += "<p>Monopoly!</p>";
				updateScroll();
			}
		} else {
			console.log("Failure: pairNum not valid entry");	
		}
	}
	propertySpace() {
		if (this.ownedBy == -1) // runs if not owned by player
		{
			console.log("Would you like to buy " + this.name + " for $" + this.cost + "?");
			document.getElementById('log').innerHTML += "<p>Would you like to buy " + this.name + " for $" + this.cost + "?</p>";
			updateScroll();
			inputToggle = "Buy Property";
		}
		else if (this.ownedBy != activePlayer && !this.isMortgaged) // runs if owned by different player and not mortgaged
		{
			console.log("Must pay rent for " + this.name);
			document.getElementById('log').innerHTML += "<p>Must pay rent for " + this.name + "</p>";
			updateScroll();
			if (this.isMonopoly && this.development == 0) // doubles rent if has monopoly and unimproved
			{
				players[activePlayer].money -= this.rent[0] * 2;
				players[this.ownedBy].money += this.rent[0] * 2;
				console.log(players[activePlayer] + " has paid $" + this.rent[0] * 2);
				document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has paid $" + this.rent[0] * 2 + "</p>";
				updateScroll();
			}
			else
			{
				players[activePlayer].money -= this.rent[this.development];
				players[this.ownedBy].money += this.rent[this.development];
				console.log(players[activePlayer] + " has paid $" + this.rent[this.development]);
				document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has paid $" + this.rent[this.development] + "</p>";
				updateScroll();
			}
			endTurn();
		}
		else
		{
			console.log("Landed on " + this.name);
			document.getElementById('log').innerHTML += "<p>Landed on " + this.name + "</p>";
			updateScroll();
			endTurn();
		}
	}
	buyProperty() {
		players[activePlayer].money -= this.cost;
		this.ownedBy = activePlayer;
		console.log(players[activePlayer] + " has bought " + this.name);
		document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has bought " + this.name + "</p>";
		updateScroll();
	}
}

class Utility {
	constructor(name) {
		this.name = name;
		this.ownedBy = -1;
		this.isMortgaged = false;
	}
	logInfo() {
		console.log(this.name);
		console.log(this.ownedBy);
		console.log(this.isMortgaged);
	}
	utilitySpace()
	{
		if (this.ownedBy == -1) // runs if not owned by player
		{
			console.log("Would you like to buy " + this.name + " for $150?");
			document.getElementById('log').innerHTML +="<p>Would you like to buy " + this.name + " for $150?</p>";
			inputToggle = "Buy Utility";
		}
		else if (this.ownedBy != activePlayer && !this.isMortgaged) // runs if owned by different player and not mortgaged
		{
			console.log("Must pay rent for " + this.name);
			document.getElementById('log').innerHTML += "<p>Must pay rent for " + this.name + "</p>";
			updateScroll();
			let numOwned = 0;
			for (let i = 0; i < 2; i++) // finds the amount of utilities owned by the player
			{
				if (utilities[i].ownedBy == this.ownedBy)
				{
					numOwned++;
				}
			}
			switch (numOwned)
			{
				case 1:
					players[activePlayer].money -= (diceOne + diceTwo) * 4;
					players[this.ownedBy].money += (diceOne + diceTwo) * 4;
					console.log(players[activePlayer] + " has paid $" + (diceOne + diceTwo) * 4);
					document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has paid $" + (diceOne + diceTwo) * 4 + "</p>";
					updateScroll();
					break;
				case 2:
					players[activePlayer].money -= (diceOne + diceTwo) * 10;
					players[this.ownedBy].money += (diceOne + diceTwo) * 10;
					console.log(players[activePlayer] + " has paid $" + (diceOne + diceTwo) * 10);
					document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has paid $" + (diceOne + diceTwo) * 4 + "</p>";
					updateScroll();
					break;
				default:
					throw new Error("Number of utilities owned unknown");
			}
			endTurn();
		}
		else
		{
			console.log("Landed on " + this.name);
			document.getElementById('log').innerHTML += "<p>Landed on " + this.name + "</p>";
			updateScroll();
			endTurn();
		}
	}
	buyUtility()
	{
		players[activePlayer].money -= 150;
		this.ownedBy = activePlayer;
		console.log(players[activePlayer] + " has bought " + this.name);
		document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has bought " + this.name + "</p>";
		updateScroll();
	}
}

class BusStop {
	constructor(name) {
		this.name = name;
		this.ownedBy = -1;
		this.isMortgaged = false;
	}
	logInfo() {
		console.log(this.name);
		console.log(this.ownedBy);
		console.log(this.isMortgaged);
	}
	busStopSpace()
	{
		if (this.ownedBy == -1) // runs if not owned by player
		{
			console.log("Would you like to buy " + this.name + " for $200?");
			document.getElementById('log').innerHTML += "<p>Would you like to buy " + this.name + " for $200?</p>";
			updateScroll();
			inputToggle = "Buy Bus Stop";
		}
		else if (this.ownedBy != activePlayer && !this.isMortgaged) // runs if owned by different player and not mortgaged
		{
			console.log("Must pay rent for " + this.name);
			document.getElementById('log').innerHTML += "<p>Must pay rent for " + this.name + "</p>";
			updateScroll();
			let numOwned = 0;
			for (let i = 0; i < 4; i++) // finds the amount of bus stops owned by the player
			{
				if (busStops[i].ownedBy == this.ownedBy)
				{
					numOwned++;
				}
			}
			players[activePlayer].money -= 25 * Math.pow(2, numOwned - 1); // 25, 50, 100, 200
			players[this.ownedBy].money += 25 * Math.pow(2, numOwned - 1);
			console.log(players[activePlayer] + " has paid $" + 25 * Math.pow(2, numOwned - 1));
			document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has paid $" + 25 * Math.pow(2, numOwned - 1) + "</p>";
			updateScroll();
			endTurn();
		}
		else
		{
			console.log("Landed on " + this.name);
			document.getElementById('log').innerHTML += "<p>Landed on " + this.name + "</p>";
			updateScroll();
			endTurn();
		}
	}
	buyBusStop()
	{
		players[activePlayer].money -= 200;
		this.ownedBy = activePlayer;
		console.log(players[activePlayer] + " has bought " + this.name);
		document.getElementById('log').innerHTML += "<p>" + players[activePlayer] + " has bought " + this.name + "</p>";
		updateScroll();
	}
}

class Card {
	constructor(type, description) {
		this.type = type;
		this.description = description;
	}
	logInfo() {
		console.log(this.type);
		console.log(this.description);
	}
}


// VARIABLES

const players = [];	// creates empty player array for setup to push to
const properties = [	// creates pre-set property objects (name, cost, houseCost, rent)
    new Property('Sage Hall', 60, 50, [2,10,30,90,160,250]),
    new Property('Sycamore Hall', 60, 50, [4,20,60,180,320,450]),
    new Property('Wooten Hall', 100, 50, [6,30,90,270,400,550]),
    new Property('Business Building', 100, 50, [6,30,90,270,400,550]),
    new Property('Joe Green Hall', 120, 50, [8,40,100,300,450,600]),
    new Property('Kerr Hall', 140, 100, [10,50,150,450,625,750]),
    new Property('Maple Hall', 140, 100, [10,50,150,450,625,750]),
    new Property('Rawlins Hall', 160, 100, [12,60,180,500,700,900]),
    new Property('The Pit', 180, 100, [14,70,200,550,750,950]),
    new Property('Pohl Recreation Center', 180, 100, [14,70,200,550,750,950]),
    new Property('Chestnut Hall', 200, 100, [16,80,220,600,800,1000]),
    new Property('West Hall', 220, 150, [18,90,250,700,875,1050]),
    new Property('Legends Hall', 220, 150, [18,90,250,700,875,1050]),
    new Property('Environmental Science Building', 240, 150, [20,100,300,750,925,1100]),
    new Property('Chemistry Building', 260, 150, [22,110,330,800,975,1150]),
    new Property('Music Building', 260, 150, [22,110,330,800,975,1150]),
    new Property('Chilton Hall', 280, 150, [24,120,360,850,1025,1200]),
    new Property('General Academic Building', 300, 200, [26,130,390,900,1100,1275]),
    new Property('Art Building', 300, 200, [26,130,390,900,1100,1275]),
    new Property('Language Building', 320, 200, [28,150,450,1000,1200,1400]),
    new Property('Eagle Student Services Center', 350, 200, [35,175,500,1100,1300,1500]),
    new Property('Willis Library', 400, 200, [50,200,600,1400,1700,2000])
];
const utilities = [ // creates pre-set utility objects
    new Utility('Eagle Landing'),
    new Utility('Bruce Cafeteria')
];
const busStops = [ // creates pre-set bus stop objects
    new BusStop('Discovery Park Bus Stop'),
    new BusStop('General Acedemic Building Bus Stop'),
    new BusStop('Maple Hall Bus Stop'),
    new BusStop('Union Transfer Bus Stop')
];
const chestCards = [ // creates pre-set community chest card objects
    new Card('advanceUnion', 'Advance to the Union (Collect $200)'),
    new Card('doctorFee', 'Doctor’s fee. Pay $50'),
    new Card('schoolFee', 'Pay school fees of $50'),
    new Card('hospitalFee', 'Pay hospital fees of $100'),
    new Card('streetRepairs', 'You are assessed for street repairs. $40 per house. $115 per hotel'),
    new Card('birthday', 'It is your birthday. Collect $10 from every player'),
    new Card('beautyContest', 'You have won second prize in a beauty contest. Collect $10'),
    new Card('taxRefund', 'Income tax refund. Collect $20'),
    new Card('consultancyFee', 'Collect $25 consultancy fee'),
    new Card('stockSale', 'From sale of stock you get $50'),
    new Card('inherit', 'You inherit $100'),
    new Card('fundMatures', 'Holiday fund matures. Collect $100'),
    new Card('insuranceMatures', 'Life insurance matures. Collect $100'),
    new Card('bankError', 'Bank error in your favor. Collect $200'),
    new Card('goJail', 'Go to Parking Jail. Go directly to Parking Jail, do not pass the Union, do not collect $200'),
    new Card('jailFree', 'Get out of Parking Jail free. This card can be kept until needed')
];
const chanceCards = [	// creates pre-set chance card objects
    new Card('advanceUnion', 'Advance to the Union (Collect $200)'),
    new Card('advanceDiscovery', 'Take a trip to the Discovery Park Bus Stop. If you pass the Union, collect $200'),
    new Card('advanceKerr', 'Advance to Kerr Hall. If you pass the Union, collect $200'),
    new Card('advanceEnviSci', 'Advance to the Environmental Science Building. If you pass the Union, collect $200'),
    new Card('advanceWillis', 'Advance to Willis Library'),
    new Card('advanceUtility', 'Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown'),
    new Card('advanceBusStop', 'Advance to the nearest Bus Stop. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled'),
    new Card('advanceBusStop', 'Advance to the nearest Bus Stop. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled'),
    new Card('backThree', 'Go back 3 spaces'),
    new Card('speedingFine', 'Pay speeding fine of $15'),
    new Card('chairman', 'You have been elected Chairman of the Board. Pay each player $50'),
    new Card('generalRepairs', 'Make general repairs on all your property. For each house pay $25. For each hotel pay $100'),
    new Card('dividend', 'Bank pays you dividend of $50'),
    new Card('loanMatures', 'Your building loan matures. Collect $150'),
    new Card('goJail', 'Go to Parking Jail. Go directly to Parking Jail, do not pass the Union, do not collect $200'),
    new Card('jailFree', 'Get out of Parking Jail free. This card can be kept until needed')
];

let houseCount = 32;    	// how many houses the bank has to sell
let hotelCount = 12;    	// how many hotels the bank has to sell
let activePlayer = 0;   	// determines which player's turn it is
let diceOne = 0;        	// first dice roll
let diceTwo = 0;        	// second dice roll
let doubleCount = 0;    	// how many consecutive doubles have been rolled
let doubleRolled = false; 	// determines if double rolled

let response = "";		// user response
let diceRollable = true; 	// determines if dice can be rolled (at beginning of turn and such)
let inputToggle = "None"; 	// determines what input is needed for


// FUNCTIONS

function updateScroll(){
    var element = document.getElementById("log");
    element.scrollTop = element.scrollHeight;
}

function playerSetup(numP)
{
	for (let i=0; i<numP; i++)
	{
		//players[i].name = String(document.getElementById("p"+(i+1)+"Name").value);
		players.push(new Player(String(document.getElementById("p"+(i+1)+"Name").value)));
		console.log(players[i].name + " is player " + (i+1));
	}

	var x = document.getElementById("start");
	var y = document.getElementById("game")
  	if (x.style.display === "none") {
    	x.style.display = "none";
		y.style.display = "block";
  	} 
	else {
    	x.style.display = "none";
		y.style.display = "block";
  	}
	
	console.log(players[activePlayer].name + "'s turn, roll the dice");
	document.getElementById('log').innerHTML += "<p>" + players[activePlayer].name + "'s turn, roll the dice</p>";
	updateScroll();
}

function diceRoll()
{
	if (diceRollable)
	{
		doubleRolled = false;
		diceRollable = false;

		diceOne = Math.floor(Math.random() * 5 + 1); // random 1-6
		diceTwo = Math.floor(Math.random() * 5 + 1); // random 1-6
		console.log('You rolled ' + diceOne + ' and ' + diceTwo);
		document.getElementById('log').innerHTML += "<p>You rolled " + diceOne + " and " + diceTwo + "</p>";
		updateScroll();

		if (diceOne == diceTwo) // checks if player rolled double
		{
			if (players[activePlayer].inJail) // leave jail if double rolled while jailed
			{
				console.log("Leaving jail");
				document.getElementById('log').innerHTML += "<p>Leaving jail</p>";
				updateScroll();
				players[activePlayer].inJail = false;
				startTurn();
			}
			else
			{
				doubleCount++;
				if (doubleCount == 3) // send player to jail if three doubles rolled in a row
				{
					console.log("3 doubles rolled, go to jail");
					document.getElementById('log').innerHTML += "<p>3 doubles rolled, go to jail</p>";
					updateScroll();
					players[activePlayer].inJail = true;
					endTurn();
				}
				else
				{
					console.log("Double!");
					document.getElementById('log').innerHTML += "<p>Double!</p>";
					updateScroll();
					doubleRolled = true;
					startTurn();
				}
			}
		}
		else
		{
			if (players[activePlayer].inJail)
			{
				jailTurn();
			}
			else
			{
				startTurn();
			}
		}
	}
}

function startTurn()
{
	players[activePlayer].position += diceOne + diceTwo;
	if (players[activePlayer].position > 39) // handles looping around board
	{
		players[activePlayer].position %= 40;
		players[activePlayer].money += 200; // pass the Union
		console.log("Passed the Union, collect $200");
		document.getElementById('log').innerHTML += "<p>Passed the Union, collect $200</p>";
		updateScroll();
	}

	console.log('Position is now ' + players[activePlayer].position);
	document.getElementById('log').innerHTML += "<p>Position is now " + players[activePlayer].position + "</p>";
	updateScroll();

	switch (players[activePlayer].position)
	{
		case 0:		// Union
			console.log('Union');
			document.getElementById('log').innerHTML += "<p>Union</p>";
			updateScroll();
			endTurn();
			break;
		case 1:		// Sage Hall
			properties[0].propertySpace();
			break;
		case 2:		// Community Chest
			console.log('Community chest');
			document.getElementById('log').innerHTML += "<p>Community chest</p>";
			updateScroll();
			endTurn();
			break;
		case 3:		// Sycamore Hall
			properties[1].propertySpace();
			break;
		case 4:		// Tuition Payment
			console.log('Tuition payment, pay $200');
			document.getElementById('log').innerHTML += "<p>Tuition payment, pay $200</p>";
			updateScroll();
			players[activePlayer].money -= 200;
			endTurn();
			break;
		case 5:		// Discovery Park Bus Stop
			busStops[0].busStopSpace();
			break;
		case 6:		// Wooten Hall
			properties[2].propertySpace();
			break;
		case 7:		// Chance
			console.log('Chance');
			document.getElementById('log').innerHTML += "<p>Chance</p>";
			updateScroll();
			endTurn();
			break;
		case 8:		// Business Building
			properties[3].propertySpace();
			break;
		case 9:		// Joe Green Hall
			properties[4].propertySpace();
			break;
		case 10:	// Garage
			console.log('Garage');
			document.getElementById('log').innerHTML += "<p>Garage</p>";
			updateScroll();
			endTurn();
			break;
		case 11:	// Kerr Hall
			properties[5].propertySpace();
			break;
		case 12:	// Eagle Landing
			utilities[0].utilitySpace();
			break;
		case 13:	// Maple Hall
			properties[6].propertySpace();
			break;
		case 14:	// Rawlins Hall
			properties[7].propertySpace();
			break;
		case 15:	// General Acedemic Building Bus Stop
			busStops[1].busStopSpace();
			break;
		case 16:	// The Pit
			properties[8].propertySpace();
			break;
		case 17:	// Community Chest
			console.log('Community chest');
			document.getElementById('log').innerHTML += "<p>Community chest</p>";
			updateScroll();
			endTurn();
			break;
		case 18:	// Pohl Recreation Center
			properties[9].propertySpace();
			break;
		case 19:	// Chesnut Hall
			properties[10].propertySpace();
			break;
		case 20:	// Voertman's
			console.log("Voertman's");
			document.getElementById('log').innerHTML += "<p>Voertman's</p>";
			updateScroll();
			endTurn();
			break;
		case 21:	// West Hall
			properties[11].propertySpace();
			break;
		case 22:	// Chance
			console.log('Chance');
			document.getElementById('log').innerHTML += "<p>Chance</p>";
			updateScroll();
			endTurn();
			break;
		case 23:	// Legends Hall
			properties[12].propertySpace();
			break;
		case 24:	// Environmental Science Building
			properties[13].propertySpace();
			break;
		case 25:	// Maple Hall Bus Stop
			busStops[2].busStopSpace();
			break;
		case 26:	// Chemistry Building
			properties[14].propertySpace();
			break;
		case 27:	// Bruce Cafeteria
			utilities[1].utilitySpace();
			break;
		case 28:	// Music Building
			properties[15].propertySpace();
			break;
		case 29:	// Chilton Hall
			properties[16].propertySpace();
			break;
		case 30:	// Go to Jail
			console.log('Go to jail');
			document.getElementById('log').innerHTML += "<p>Go to jail</p>";
			updateScroll();
			doubleRolled = false;
			players[activePlayer].inJail = true;
			players[activePlayer].position = 10;
			endTurn();
			break;
		case 31:	// General Academic Building
			properties[17].propertySpace();
			break;
		case 32:	// Art Building
			properties[18].propertySpace();
			break;
		case 33:	// Community Chest
			console.log('Community chest');
			document.getElementById('log').innerHTML += "<p>Community chest</p>";
			updateScroll();
			endTurn();
			break;
		case 34:	// Language Building
			properties[19].propertySpace();
			break;
		case 35:	// Union Bus Stop
			busStops[3].busStopSpace();
			break;
		case 36:	// Chance
			console.log('Chance');
			document.getElementById('log').innerHTML += "<p>Chance</p>";
			updateScroll();
			endTurn();
			break;
		case 37:	// Eagle Student Services Center
			properties[20].propertySpace();
			break;
		case 38:	// Loan Payment
			console.log('Loan payment, pay $100');
			document.getElementById('log').innerHTML += "<p>Loan payment, pay $100</p>";
			updateScroll();
			players[activePlayer].money -= 100;
			endTurn();
			break;
		case 39:	// Willis Library
			properties[21].propertySpace();
			break;
		default:
			throw new Error("Position unknown");
	}
}

function endTurn()
{
	console.log('Money is now $' + players[activePlayer].money);
	document.getElementById('log').innerHTML += "<p>Money is now $" + players[activePlayer].money + "</p>";
	updateScroll();

	// NEED TO CHECK FOR BANKRUPTCY

	if (!doubleRolled) // ends turn if player didn't roll double
	{
		activePlayer++;
		activePlayer %= players.length;	// returns to first player’s turn after all others
		doubleCount = 0;
		console.log("\n" + players[activePlayer].name + "'s turn, roll the dice");
		document.getElementById('log').innerHTML += "<p></p>";
		document.getElementById('log').innerHTML += "<p>" + players[activePlayer].name + "'s turn, roll the dice</p>";
		updateScroll();
	}
	else
	{
		console.log("Roll again");
		document.getElementById('log').innerHTML += "<p>Roll again</p>";
		updateScroll();
	}

	diceRollable = true;
}

function jailTurn()
{
	console.log("In jail");
	document.getElementById('log').innerHTML += "<p>In jail</p>";
	updateScroll();
	endTurn();
}

// runs if user presses enter while clicked onto the input box
window.onload = function() {
    document.getElementById('answer').addEventListener('keyup', function(event)
    {
        if (event.code === 'Enter')
        {
            response = document.getElementById('answer').value;
            document.getElementById('answer').value = '';
            if (inputToggle != "None")
            {
                input();
            }
        }
    });
}

function input()
{
	if (response == "Y" || response == "N" || response == "y" || response == "n")
	{
		switch (inputToggle)
		{
			case "Buy Property":
				if (response == "Y" || response == "y")
				{
					switch (players[activePlayer].position)
					{
						case 1:		// Sage Hall
							properties[0].buyProperty();
							properties[0].checkMonopoly(2, 1, undefined);
							break;
						case 3:		// Sycamore Hall
							properties[1].buyProperty();
							properties[1].checkMonopoly(2, 0, undefined);
							break;
						case 6:		// Wooten Hall
							properties[2].buyProperty();
							properties[2].checkMonopoly(3, 3, 4);
							break;
						case 8:		// Business Building
							properties[3].buyProperty();
							properties[3].checkMonopoly(3, 2, 4);
							break;
						case 9:		// Joe Green Hall
							properties[4].buyProperty();
							properties[4].checkMonopoly(3, 2, 3);
							break;
						case 11:	// Kerr Hall
							properties[5].buyProperty();
							properties[5].checkMonopoly(3, 6, 7);
							break;
						case 13:	// Maple Hall
							properties[6].buyProperty();
							properties[6].checkMonopoly(3, 5, 7);
							break;
						case 14:	// Rawlins Hall
							properties[7].buyProperty();
							properties[7].checkMonopoly(3, 5, 6);
							break;
						case 16:	// The Pit
							properties[8].buyProperty();
							properties[8].checkMonopoly(3, 9, 10);
							break;
						case 18:	// Pohl Recreation Center
							properties[9].buyProperty();
							properties[9].checkMonopoly(3, 8, 10);
							break;
						case 19:	// Chesnut Hall
							properties[10].buyProperty();
							properties[10].checkMonopoly(3, 8, 9);
							break;
						case 21:	// West Hall
							properties[11].buyProperty();
							properties[11].checkMonopoly(3, 12, 13);
							break;
						case 23:	// Legends Hall
							properties[12].buyProperty();
							properties[12].checkMonopoly(3, 11, 13);
							break;
						case 24:	// Environmental Science Building
							properties[13].buyProperty();
							properties[13].checkMonopoly(3, 11, 12);
							break;
						case 26:	// Chemistry Building
							properties[14].buyProperty();
							properties[14].checkMonopoly(3, 15, 16);
							break;
						case 28:	// Music Building
							properties[15].buyProperty();
							properties[15].checkMonopoly(3, 14, 16);
							break;
						case 29:	// Chilton Hall
							properties[16].buyProperty();
							properties[16].checkMonopoly(3, 14, 15);
							break;
						case 31:	// General Academic Building
							properties[17].buyProperty();
							properties[17].checkMonopoly(3, 18, 19);
							break;
						case 32:	// Art Building
							properties[18].buyProperty();
							properties[18].checkMonopoly(3, 17, 19);
							break;
						case 34:	// Language Building
							properties[19].buyProperty();
							properties[19].checkMonopoly(3, 17, 18);
							break;
						case 37:	// Eagle Student Services Center
							properties[20].buyProperty();
							properties[20].checkMonopoly(2, 21, undefined);
							break;
						case 39:	// Willis Library
							properties[21].buyProperty();
							properties[21].checkMonopoly(2, 20, undefined);
							break;
						default:
							throw new Error("Position unknown");
					}
				}
				else
				{
					// AUCTION
				}
				break;
			case "Buy Utility":
				if (response == "Y" || response == "y")
				{
					switch (players[activePlayer].position)
					{
						case 12:	// Eagle Landing
							utilities[0].buyUtility();
							break;
						case 27:	// Bruce Cafeteria
							utilities[1].buyUtility();
							break;
						default:
							throw new Error("Position unknown");
					}
				}
				else
				{
					// AUCTION
				}
				break;
			case "Buy Bus Stop":
				if (response == "Y" || response == "y")
				{
					switch (players[activePlayer].position)
					{
						case 5:		// Discovery Park Bus Stop
							busStops[0].buyBusStop();
							break;
						case 15:	// General Acedemic Building Bus Stop
							busStops[1].buyBusStop();
							break;
						case 25:	// Maple Hall Bus Stop
							busStops[2].buyBusStop();
							break;
						case 35:	// Union Bus Stop
							busStops[3].buyBusStop();
							break;
						default:
							throw new Error("Position unknown");
					}
				}
				else
				{
					// AUCTION
				}
				break;
			case "Use Jail Card":

				break;
			case "Pay Jail Fee":

				break;
			default:
				throw new Error("Input toggle unknown");
		}
		inputToggle = "None";
		endTurn();
	}
	else
	{
		console.log("Incorrect input, only enter 'Y' or 'N'");
		document.getElementById('log').innerHTML += "<p>Incorrect input, only enter 'Y' or 'N'</p>";
		updateScroll();
	}
}
