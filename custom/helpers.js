const user_data = require('../userdata.json'); // static user data
const riskAnalysis = require('../custom/riskAnalysis'); // risk analysis module

function getTrans(){

}

function getLargePurchases(min, numberToDisplay){

	const firstUsersData = user_data.Users[0]; // Data for first user

	let purchases = firstUsersData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account.";
	}

	let output = "";

	output += `Here are your top ${numberToDisplay} most expensive purchases. `;

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