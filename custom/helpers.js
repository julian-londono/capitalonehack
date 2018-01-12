const user_data = require('../userdata.json'); // static user data

const riskAnalysis = require('../custom/riskAnalysis'); // risk analysis module
const auth = require('../custom/auth'); // pseudo authentication and authorization

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

function getLastBills(num){
	const usersData = auth.getCurrentUserData();
	if(num <= 0){
		num = 5;
	}
	output = `Your next ${num} bills are `;
	num = Math.min(num,usersData.bills.length);
	for(let i =0; i < num;i++){
		if(i == num-1){
			output+= `and `;
		}
		if(i < usersData.bills.length){
			output += `${usersData.bills[i].type} for $${usersData.bills[i].amount}, `;
		}
	}
	return output;
}

function payBills(billType) {
    let user = auth.getCurrentUserData(); // get user object
    let bills = user.bills; // get list of bill objects
    let balance = user.balance; // get user balance
    let current_bill = checkBillExists(billType, bills); // get current bill

    let output = "";

    // if the account has bills associated with it
    if (bills.length) {
        // if there is no bill w/ that name
        console.log(typeof billType);
        if (billType == "") {
            output += 'Would you like to pay off all your bills?';
        }
        // if there are no parameters provided
        else if (Object.keys(current_bill).length === 0) {
            output += `I cannot find a bill for ${billType}.`;
        } else {
            // if there is enough money to pay off the bill
            if (current_bill.amount < balance) {
                output += `Okay, I have paid off your ${billType} bill. Your balance has changed from ${balance} to `;
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
			output += `${usersData.purchases[i].type} for $${usersData.purchases[i].amount}, `;
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

	output += `Here are your top ${numberToDisplay} most expensive purchases: `;

	for (let i = 0; i < purchases.length; i++){
		if (i < numberToDisplay && purchases[i].amount >= min){
			if(i != numberToDisplay - 1){
				output += `Purchase ${i+1} of ${purchases[i].type} for $${purchases[i].amount}`
				output += `,, and `; // Natural pause and space between sentences
			}

			if(i == numberToDisplay - 1){
				output += `Purchase ${i+1} of ${purchases[i].type} for $${purchases[i].amount}.`
			}
		}
	}

	output += ` Let's talk risk. ${riskAnalysis.getSuspiciousPurchases(numberToDisplay)}`;

	if(output === ""){
		return `Sorry, there are no purchases above the price of $${min}`;
	}

	return output;
}

function getAccountBalance(accountType){
	const usersData = auth.getCurrentUserData();
	return usersData[accountType];
}

function getSpending(category){
	const user = auth.getCurrentUserData(); // get user data

	let purchases = firstUsersData.purchases;
	let purchasesInCategory = [{}];

	let sum = 0;
	for (let i = 0; i < purchases.length; i++){
		if (purchases[i].category === category){
			purchasesInCategory.push(purchases[i]);	// add this purchase json object into the array
			sum += purchases[i].amount;
		}
	}

	if (purchasesInCategory.length === 0){
		return 'You have spent $0 on ${category}';
	}

	purchasesInCategory = purchasesInCategory.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	return `You have spent a total of ${sum} on ${category}, with the most expensive individual purchase of $${purchasesInCategory[0].amount} being spent on ${purchasesInCategory[0].type}. `;
}

// Ben & Richard
function analyzeTransactions(){
    const user = auth.getCurrentUserData(); // get current user data

    return 'a';
}

// Ben & Richard
function analyzeHabits(){
    const user = auth.getCurrentUserData(); // get current user data

    return 'a';
}

// Julian & Nick
function giveGeneralAdvice(){
    const user = auth.getCurrentUserData(); // get current user data

    return 'a';
}

module.exports.getTrans = getTrans;
module.exports.getLargePurchases = getLargePurchases;
module.exports.payBills = payBills;
module.exports.getAccountBalance = getAccountBalance;
module.exports.getSpending = getSpending;
module.exports.analyzeTransactions = analyzeTransactions;
module.exports.analyzeHabits = analyzeHabits;
module.exports.giveGeneralAdvice = giveGeneralAdvice;
module.exports.getLastBills = getLastBills;
