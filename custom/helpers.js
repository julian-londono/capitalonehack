const user_data = require('../userdata.json'); // static user data
const riskAnalysis = require('../custom/riskAnalysis'); // risk analysis module
const auth = require('../custom/auth'); // pseudo authentication and authorization

function getTrans(num){
	const usersData = auth.getCurrentUserData();
	if(num <= 0){
		num = 5;
	}
	output = `Your last ${num} purchases are `;
	num = Math.min(num,usersData.purchases.length);
	for(let i =0; i < num;i++){
		if(i == num-1){
			output+= `and `;
		}
		if(i < usersData.purchases.length){
			output += `${usersData.purchases[i].type} for $${purchases[i].amount}, `;
		}
	}
	return output;
}

function getLargePurchases(min, numberToDisplay){

	const firstUsersData = auth.getCurrentUserData();

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
