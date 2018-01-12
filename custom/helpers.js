const user_data = require('../userdata.json'); // static user data
const riskanalysis = require('../custom/riskanalysis'); // static user data

function currentUser(){
	const credentials = require("../credentials.json");
	for(int i = 0; i < user_data.Users.length; i++){
		if(user_data.Users[i].name == credentials.name)
			return user_data.Users[i];
		}
	}
	console.log("Error");
	return user_data.Users[0];
}

function getTrans(num){
	const firstUsersData = currentUser();
}

function getLargePurchases(min){

	const firstUsersData = currentUser(); // Data for first user

	const numberToDisplay = 3;


	let purchases = firstUsersData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account.";
	}

	let output = "";

	for (let i = 0; i < purchases.length;i++){
		if (i < numberToDisplay && purchases[i].amount >= min){

			// Make sure the 'and' is onal appended if it is not the last clause
			if(i != numberToDisplay - 1){
				output += `Purchase ${i+1} of ${purchases[i].type} for $${purchases[i].amount}\n`
				output += `seems large,, and `; // Natural pause and space between sentences
			}

			if(i == numberToDisplay - 1){
				output += `Purchase ${i+1} of ${purchases[i].type} for $${purchases[i].amount} seems really large.\n`
			}
		}
	}

	if(output === ""){
		return `Sorry, there are no purchases above the price of $${min}`;
	}

	return output;
}

module.exports.getTrans = getTrans;
module.exports.getLargePurchases = getLargePurchases;
