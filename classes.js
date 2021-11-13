
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
			}
		} else if (pairNum == 3) {
			if (!this.isMonopoly && this.ownedBy == activePlayer && properties[pair1Property].ownedBy == activePlayer && properties[pair2Property].ownedBy == activePlayer){
				this.isMonopoly = properties[pair1Property].isMonopoly = properties[pair2Property].isMonopoly = true;
				console.log("Monopoly!");
			}
		} else {
			console.log("Failure: pairNum not valid entry");	
		}
	}
	propertySpace() {
		if (this.ownedBy == -1) // runs if not owned by player
		{
			console.log("Buy " + this.name + " for $" + this.cost);
			//let input = prompt("Would you like to buy " + this.name + " for " + this.cost + "? Y/N");
			//if (input == "Y")
			//{
				players[activePlayer].money -= this.cost;
				this.ownedBy = activePlayer;
				console.log(this.ownedBy);
			//}
		}
		else if (this.ownedBy != activePlayer && !this.isMortgaged) // runs if owned by different player and not mortgaged
		{
			console.log("Must pay rent for " + this.name);
			if (this.isMonopoly && this.development == 0) // doubles rent if has monopoly and unimproved
			{
				players[activePlayer].money -= this.rent[0] * 2;
				players[this.ownedBy].money += this.rent[0] * 2;
			}
			else
			{
				players[activePlayer].money -= this.rent[this.development];
				players[this.ownedBy].money += this.rent[this.development];
			}
		}
		else
		{
			console.log("Landed on " + this.name);
		}
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
			console.log("Buy " + this.name + " for $150");
			//let input = prompt("Would you like to buy " + this.name + " for $150? Y/N");
			//if (input == "Y")
			//{
				players[activePlayer].money -= 150;
				this.ownedBy = activePlayer;
				console.log(this.ownedBy);
			//}
		}
		else if (this.ownedBy != activePlayer && !this.isMortgaged) // runs if owned by different player and not mortgaged
		{
			console.log("Must pay rent for " + this.name);
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
					break;
				case 2:
					players[activePlayer].money -= (diceOne + diceTwo) * 10;
					players[this.ownedBy].money += (diceOne + diceTwo) * 10;
					break;
				default:
					console.log('ERROR: Number of utilities owned unknown');
			}
		}
		else
		{
			console.log("Landed on " + this.name);
		}
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
			console.log("Buy " + this.name + " for $200");
			//let input = prompt("Would you like to buy " + this.name + " for $150? Y/N");
			//if (input == "Y")
			//{
				players[activePlayer].money -= 200;
				this.ownedBy = activePlayer;
				console.log(this.ownedBy);
			//}
		}
		else if (this.ownedBy != activePlayer && !this.isMortgaged) // runs if owned by different player and not mortgaged
		{
			console.log("Must pay rent for " + busStops[busNum].name);
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
		}
		else
		{
			console.log("Landed on " + this.name);
		}
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

// temporary, will need to get player name from the user during setup phase in future
const playerNames = ['Colin', 'Josh', 'Lori', 'Eli'];

const players = [];
//playerNames.forEach(playerName => players.push(new Player(playerName))); // creates player objects for each user-input player
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

let isGameActive = true;  // keeps track of whether game is still going
let houseCount = 32;    // how many houses the bank has to sell
let hotelCount = 12;    // how many hotels the bank has to sell
let activePlayer = 0;   // determines which player's turn it is
let diceOne = 0;        // first dice roll
let diceTwo = 0;        // second dice roll
let doubleCount = 0;    // how many consecutive doubles have been rolled


// FUNCTIONS

function playerSetup(numP)
{
	for (let i=0; i<numP; i++)
	{
		//players[i].name = String(document.getElementById("p"+(i+1)+"Name").value);
		players.push(new Player(String(document.getElementById("p"+(i+1)+"Name").value)));
		console.log(players[i].name+ " is "+ "player " +(i+1));
	}
	
	
	playGame();
}


// GAME

function playGame(){
	
	while (isGameActive) 
	{
		console.log("\n" + players[activePlayer].name + "'s turn");
		doubleCount = 0;

		while (1) // loops if player rolls double, breaks if not
		{
			// NEED TO CHECK IF IN JAIL

			// NEED TO WAIT FOR DICE BUTTON
			diceOne = Math.floor(Math.random() * 5 + 1); // random 1-6
			diceTwo = Math.floor(Math.random() * 5 + 1); // random 1-6
			console.log('You rolled ' + diceOne + ' and ' + diceTwo);
			players[activePlayer].position += diceOne + diceTwo;
			if (players[activePlayer].position > 39) // handles looping around board
			{
				throw new Error("END"); // TEMP
				players[activePlayer].position %= 40;
				players[activePlayer].money += 200; // pass the Union
			}

			console.log('Position is now ' + players[activePlayer].position);

			switch (players[activePlayer].position)
			{
				case 0:		// Union
					console.log('Union');
					break;
				case 1:		// Sage Hall
					properties[0].propertySpace();
					properties[0].checkMonopoly(2, 1, undefined);
					break;
				case 2:		// Community Chest
					console.log('Community chest');
					break;
				case 3:		// Sycamore Hall
					properties[1].propertySpace();
					properties[1].checkMonopoly(2, 0, undefined);
					break;
				case 4:		// Tuition Payment
					console.log('Tuition payment, pay $200');
					players[activePlayer].money -= 200;
					break;
				case 5:		// Discovery Park Bus Stop
					busStops[0].busStopSpace();
					break;
				case 6:		// Wooten Hall
					properties[2].propertySpace();
					properties[2].checkMonopoly(3, 3, 4);
					break;
				case 7:		// Chance
					console.log('Chance');
					break;
				case 8:		// Business Building
					properties[3].propertySpace();
					properties[3].checkMonopoly(3, 2, 4);
					break;
				case 9:		// Joe Green Hall
					properties[4].propertySpace();
					properties[4].checkMonopoly(3, 2, 3);
					break;
				case 10:	// Garage
					console.log('Garage');
					break;
				case 11:	// Kerr Hall
					properties[5].propertySpace();
					properties[5].checkMonopoly(3, 6, 7);
					break;
				case 12:	// Eagle Landing
					utilities[0].utilitySpace();
					break;
				case 13:	// Maple Hall
					properties[6].propertySpace();
					properties[6].checkMonopoly(3, 5, 7);
					break;
				case 14:	// Rawlins Hall
					properties[7].propertySpace();
					properties[7].checkMonopoly(3, 5, 6);
					break;
				case 15:	// Second Bus Stop
					busStops[1].busStopSpace();
					break;
				case 16:	// The Pit
					properties[8].propertySpace();
					properties[8].checkMonopoly(3, 9, 10);
					break;
				case 17:	// Community Chest
					console.log('Community chest');
					break;
				case 18:	// Pohl Recreation Center
					properties[9].propertySpace();
					properties[9].checkMonopoly(3, 8, 10);
					break;
				case 19:	// Chesnut Hall
					properties[10].propertySpace();
					properties[10].checkMonopoly(3, 8, 9);
					break;
				case 20:	// Voertman's
					console.log("Voertman's");
					break;
				case 21:	// West Hall
					properties[11].propertySpace();
					properties[11].checkMonopoly(3, 12, 13);
					break;
				case 22:	// Chance
					console.log('Chance');
					break;
				case 23:	// Legends Hall
					properties[12].propertySpace();
					properties[12].checkMonopoly(3, 11, 13);
					break;
				case 24:	// Environmental Science Building
					properties[13].propertySpace();
					properties[13].checkMonopoly(3, 11, 12);
					break;
				case 25:	// Third Bus Stop
					busStops[2].busStopSpace();
					break;
				case 26:	// Chemistry Building
					properties[14].propertySpace();
					properties[14].checkMonopoly(3, 15, 16);
					break;
				case 27:	// Bruce Cafeteria
					utilities[1].utilitySpace();
					break;
				case 28:	// Music Building
					properties[15].propertySpace();
					properties[15].checkMonopoly(3, 14, 16);
					break;
				case 29:	// Chilton Hall
					properties[16].propertySpace();
					properties[16].checkMonopoly(3, 14, 15);
					break;
				case 30:	// Go to Jail
					console.log('Go to jail');
					players[activePlayer].inJail = true;
					players[activePlayer].position = 10;
					break;
				case 31:	// General Academic Building
					properties[17].propertySpace();
					properties[17].checkMonopoly(3, 18, 19);
					break;
				case 32:	// Art Building
					properties[18].propertySpace();
					properties[18].checkMonopoly(3, 17, 19);
					break;
				case 33:	// Community Chest
					console.log('Community chest');
					break;
				case 34:	// Language Building
					properties[19].propertySpace();
					properties[19].checkMonopoly(3, 17, 18);
					break;
				case 35:	// Union Bus Stop
					busStops[3].busStopSpace();
					break;
				case 36:	// Chance
					console.log('Chance');
					break;
				case 37:	// Eagle Student Services Center
					properties[20].propertySpace();
					properties[20].checkMonopoly(2, 21, undefined);
					break;
				case 38:	// Loan Payment
					console.log('Loan payment, pay $100');
					players[activePlayer].money -= 100;
					break;
				case 39:	// Willis Library
					properties[21].propertySpace();
					properties[21].checkMonopoly(2, 20, undefined);
					break;
				default:
					console.log('ERROR: Position unknown');
			}

			console.log('Money is now $' + players[activePlayer].money);

			// NEED TO CHECK FOR BANKRUPTCY

			if (diceOne == diceTwo) // checks if player rolled double
			{
				doubleCount++;
				if (doubleCount == 3) // send player to jail if three doubles rolled in a row
				{
					console.log("3 doubles rolled, go to jail");
					players[activePlayer].inJail = true;
					break;
				}
			}
			else // ends turn if player didn't roll double
			{
				break;
			}
		}

		activePlayer++;
		activePlayer %= players.length;	// returns to first player’s turn after all others
	}

}
