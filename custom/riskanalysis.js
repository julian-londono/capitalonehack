const user_data = require('../userdata.json'); // static user data

function getSuspiciousPurchases(){
	const firstUsersData = user_data.Users[0]; // Data for first user

	let purchases = firstUsersData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account."	;
	}

	let output = "";

	// Attempts to find standard deviation
	let totalAmount = 0;
	for (let i = 0; i < purchases.length;i++){
		totalAmount += purchases[i].amount;
	}

	let averagePrice = totalAmount/purchases.length;

	totalAmount = 0;		// resets totalAmount so it can be recycled for another summation
	for (let i = 0; i < purchases.length;i++){
		totalAmount += Math.pow(purchases[i].amount - stdev,2);
	}
	totalAmount /= purchases.length;
	stdev = Math.sqrt(totalAmount);			// Final stdev value

	let min = (1.6*stdev) + averagePrice; 

	let foundSus = false;
	for (let i = 0; i < purchases.length;i++){
		if (purchases[i].amount >= min){
			if (!foundSus){
				output += "I found one or more suspicious purchases. "
				foundSus = true;
			}
			
			if(i != numberToDisplay - 1){
				output += `Purchase ${i+1} of ${purchases[i].type} for $${purchases[i].amount}\n`
				output += `seems abnormally large,, and `; // Natural pause and space between sentences
			}

			if(i == numberToDisplay - 1){
				output += `Purchase ${i+1} of ${purchases[i].type} for $${purchases[i].amount} seems suspicious.\n`
			}
		}
	}



	if(output === ""){
		return `I found no suspicious transactions in your account!`;
	}

	return output;
}

module.exports.getSuspiciousPurchases = getSuspiciousPurchases;
