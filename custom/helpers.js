const user_data = require('../userdata.json'); // static user data

function getTrans(){

}

function getLargePurchases(min){

	const firstUsersData = user_data.Users[0]; // Data for first user

	const numberToDisplay = 3;


	let purchases = firstUsersData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account.";
	}

	let output = "";

	for (let i = 0; i<purchases.length;i++){
		if (i < numberToDisplay && purchases[i].amount >= min){
			output += `Purchase ${i+1} of ${purchases[i].type} for ${purchases[i].amount} dollars seems large\n`

			// Make sure the 'and' is onal appended if it is not the last clause
			if(i != purchases.length - 1){
				output += `,, and `; // Natural pause and space between sentences
			}
		}
	}

	return output;
}

module.exports.getTrans = getTrans;
module.exports.getLargePurchases = getLargePurchases;
