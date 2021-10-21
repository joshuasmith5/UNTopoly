//classes.js

class Player{
	constructor(pName){
		this.name = pName;
		this.position = 0;
		this.money = 1500;
		this.monopolies = [0, 0, 0, 0, 0, 0, 0, 0]
		this.jailCards = 0;
		this.jailTurns = 0;
		this.inJail = false;
		this.hasLost = false;
	}
	logInfo(){
		console.log(this.name);
		console.log(this.position);
		console.log(this.money);
		console.log(this.jailCards);
		console.log(this.jailTurns);
		console.log(this.inJail);
		console.log(this.hasLost);
	}
}

class Property{
	constructor(pName, pCost, hCost, pRent){
		this.name = pName;
		this.cost = pCost;
		this.houseCost = hCost;
		this.rent = pRent;
		this.development = 0;
		this.ownedBy = -1;
		this.isMortgaged = false;
	}
	logInfo(){
		console.log(this.name);
		console.log(this.houseCost);
		console.log(this.cost);
		console.log(this.rent);
		console.log(this.development);
		console.log(this.ownedBy);
		console.log(this.isMortgaged);
	}
}

class Utility{
	constructor(uName){
		this.name = uName;
		this.ownedBy = -1;
		this.isMortgaged = false;
		//cost = 150
	}
	
	rent(numOwned, diceRoll){
		switch(numOwned){
			case 1:
				return (diceRoll*4);
				break;
			case 2:
				return(diceRoll*10);
				break;
			default:
				console.log("error");
				break;
		}
	}
	
	
	logInfo(){
		console.log(this.name);
		console.log(this.ownedBy);
		console.log(this.isMortgaged);
	}
}

class BusStop{
	constructor(bName){
		this.name = bName;
		this.ownedBy = -1;
		this.isMortgaged = false;
		//cost = 200
	}
	
	//Before this function call:
	//player lands on bus stop, is owned, owner is found, number of railroads owned by 
	//owner found. number owned passed into switch statment to calculate rent.
	rent(numOwned){
		switch(numOwned){
			case 1:
				return 25;
				break;
			case 2:
				return 50;
				break;
			case 3:
				return 100;
				break;
			case 4:
				return 200;
				break;
			defaut:
				console.log("error");
				break;
		}	
	}
	
	logInfo(){
		console.log(this.name);
		console.log(this.ownedBy);
		console.log(this.isMortgaged);
	}
}

class Card{
	constructor(cType, cDescription){
		this.type = cType;
		this.description = cDescription;
	}
	
	logInfo(){
		console.log(this.type);
		console.log(this.description);
	}
}


