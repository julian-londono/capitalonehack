const user_data = require('../userdata.json'); // static user data

function getSuspiciousPurchases(numberToDisplay){
	const firstUsersData = user_data.Users[0]; // Data for first user

	let purchases = firstUsersData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account."	;
	}

	// Attempts to find standard deviation
	let totalAmount = 0;
	for (let i = 0; i < purchases.length;i++){
		totalAmount += purchases[i].amount;
	}

	let averagePrice = totalAmount/purchases.length;

	totalAmount = 0; // resets totalAmount so it can be recycled for another summation
	for (let i = 0; i < purchases.length;i++){
		totalAmount += Math.pow(purchases[i].amount - averagePrice, 2);
	}
	totalAmount /= purchases.length;
	let stdev = Math.sqrt(totalAmount); // Final stdev value

	let min = (1.6 * stdev) + averagePrice;

	let suspiciousPurchases = "";
	let output = "";
	let foundSus = false;
	for (let i = 0; i < purchases.length;i++){
		if (purchases[i].amount >= min){
			if (!foundSus){
				output += "I found one or more suspicious purchases. "
				foundSus = true;
			}

			if(i != numberToDisplay - 1){
				suspiciousPurchases += `a ${purchases[i].type} purchase for $${purchases[i].amount},\n`
			}

			if(i == numberToDisplay - 1){
				suspiciousPurchases += ` and a ${purchases[i].type} purchase for $${purchases[i].amount}.\n`
			}
		}
	}

	output = `You have ${suspiciousPurchases}. These all seem abnormal to me. Would you like me to analyze further?`

	if(output === ""){
		return `I found no suspicious transactions in your account!`;
	}

	return output;
}

module.exports.getSuspiciousPurchases = getSuspiciousPurchases;
