const user_data = require('../userdata.json'); // static user data

function getUserByName(name) {
  return user_data.filter(
      function(user_data){
          return user_data.Users.name == name;
      }
  );
}

// returns bill object if bill exists
// returns empty object if bill does not exist
function checkBillExists(billType, bills) {
    for (let i = 0; i < bills.length; i++) {
        if (bills[i].type == billType) {
            return bills[i];
        }
    }
    return {};
}

function getBills(name, billType) {
    let user = getUserByName(name); // get user object
    let bills = user.bills; // get list of bill objects
    let balance = user.balance; // get user balance
    let current_bill = checkBillExists(billType, bills); // get current bill

    let output = "";

    // if the account has bills associated with it
    if (bills.length) {
        // if there are no parameters provided / current_bill is empty
        if (Object.keys(current_bill).length === 0) {
            output += 'Would you like to pay off all your bills?';
        } else {
            // if there is enough money to pay off the bill
            if (current_bill.amount < balance) {
                output += `Okay, I have paid off your ${billType} bill. Your balance has changed from ${balance} to`;
                balance -= current_bill.amount;
                output += `${balance}`;
            } else {
                output += `Sorry, this bill cannot be paid. You have a balance of ${balance}. The cost of the bill is ${current_bill.amount}.`;
            }
        }
    } else {
        output = 'There are no bills associated with this account.';
    }
    return output;
}

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
module.exports.getBills = getBills;
