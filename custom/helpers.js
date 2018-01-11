const user_data = require('../userdata.json'); // static user data

function getTrans(){

}

function getLargePurchases(){

	const min = Number.MAX_VALUE;

	const firstUsersData = user_data.Users[0]; // Data for first user

	min = parameters.unit - currency;
	var numberToDisplay = 3;


	var purchases = userinfo.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account.";
	}

	var output = "";

	for (var i = 0; i<purchases.length;i++){
		if (i < numberToDisplay && purchases[i].amount >= min){
			output += "Purchase " + (i+1) +" of " + purchases[i].type + " for " + purchases[i].amount + " dollars.";
		}
	}
}

module.exports.getTrans = getTrans;
