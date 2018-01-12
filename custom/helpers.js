const user_data = require('../userdata.json'); // static user data

const riskAnalysis = require('../custom/riskAnalysis'); // risk analysis module
const auth = require('../custom/auth'); // pseudo authentication and authorization
const util = require('../custom/utilities'); // general utilities

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
	const firstUserData = auth.getCurrentUserData(); // get user data

	let purchases = firstUserData.purchases;
	let purchasesInCategory = [];

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

	return `You have spent a total of $${sum} on ${category}, with the most expensive individual purchase of $${purchasesInCategory[0].amount} being spent on ${purchasesInCategory[0].type}. `;
}

function analyzeTransactions(){
    const userData = auth.getCurrentUserData(); // get current user data

    // Setup and get what we need to make calculations
    let purchases = userData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account.";
	}

	let output = "Ok, sure, let's talk about your transaction patterns. So here is a breakdown of your purchasing habits: ";

    //Breakdown the purchases of a user into price ranges
    let cheapPurchaseCount = 0; // $0-$19
    let midRangePurchaseCount = 0; // $20-$49
    let expensivePurchaseCount = 0; // $50-

    for (let i = 0; i < purchases.length; i++){
		if (purchases[i].amount >= 0 && purchases[i].amount < 20){
            // Cheap Purchase
            cheapPurchaseCount++;
		} else if(purchases[i].amount >= 20 && purchases[i].amount < 50){
            // Middle Range Purchase
            midRangePurchaseCount++;
        } else{
            // Expensive Purchase
            expensivePurchaseCount++;
        }
	}

    const totalPurchases = cheapPurchaseCount + midRangePurchaseCount + expensivePurchaseCount;
    const cheapPurchasePercent = Math.round((cheapPurchaseCount / totalPurchases) * 100);
    const midRangePercent = Math.round((midRangePurchaseCount / totalPurchases) * 100);
    const expensivePercent = Math.round((expensivePurchaseCount / totalPurchases) * 100);

    output += `Of ${totalPurchases} purchases, ${cheapPurchasePercent}% are what I'd call cheap, that is 0 to $19.
               ${midRangePercent}% of your purchases range from $20 to $49, and finally ${expensivePercent}% of your
               purchases are pricier going past the $50 mark.`

    return output;
}

function analyzeHabits(caller){
    const userData = auth.getCurrentUserData(); // get current user data

    // Setup and get what we need to make calculations
    let purchases = userData.purchases;
	purchases = purchases.sort(function(a,b) {
		return parseFloat(b.amount) - parseFloat(a.amount);
	});

	if (purchases.length === 0){
		return "There are no purchases logged to this account.";
	}

    let output;

    let categories = [];
    let totalSpend = 0;

    for (let i = 0; i < purchases.length; i++){
        const indexOfCategory = util.getCategoryIndex(purchases[i].category, categories);
		if (indexOfCategory != -1){
            // Update current instance of count
            const previousAmount = categories[indexOfCategory].totalSpend;
            const currentPurchaseAmount = purchases[i].amount;
            categories[indexOfCategory].totalSpend =  currentPurchaseAmount + previousAmount;
		} else{
            //Add the category and initialize the count
            categories.push({
                category: purchases[i].category,
                totalSpend: purchases[i].amount
            })
        }
        totalSpend += purchases[i].amount;
	}

    if(caller === "original"){
        output = "In regards to your spending habits let's first look at where your money is going. So let me break this down by category: ";
        let categoriesString = "";
        for (let i = 0; i < categories.length; i++){
            if(i != categories.length - 1){
                categoriesString += `$${categories[i].totalSpend} on ${categories[i].category}, `;
            }

            if(i == categories.length - 1){
                categoriesString += `and $${categories[i].totalSpend} on ${categories[i].category}.`;
            }

    	}

        output += `You've spent ${categoriesString}. I see room for improvement. Would you like more insight?`;
    } else if(caller === "first-followup"){
        const topCategoryIndex = util.getTopSpendingCategoryIndex(categories);
        const totalSpendAfterHalfTopCategory = totalSpend - (categories[topCategoryIndex].totalSpend * .5);
        const percentChange = Math.abs(Math.round(((totalSpendAfterHalfTopCategory - totalSpend) / totalSpend) * 100));
        output = `Cool, so first I see that your top category of spending was ${categories[topCategoryIndex].category} where you spent
                  $${categories[topCategoryIndex].totalSpend} total. If you cut spending there by 50% your overall spending would go down
                  from $${totalSpend} to $${totalSpendAfterHalfTopCategory}, a decent cut of ${percentChange}% which I think will help a little
                  hopefully.`
    }


    return output;
}

function giveGeneralAdvice(){
    let output = `${analyzeTransactions()} ${analyzeHabits()}`;
    return output;
}

module.exports.getTrans = getTrans;
module.exports.getLargePurchases = getLargePurchases;
module.exports.payBills = payBills;
module.exports.getAccountBalance = getAccountBalance;
module.exports.getSpending = getSpending;
module.exports.analyzeTransactions = analyzeTransactions;
module.exports.analyzeHabits = analyzeHabits;
module.exports.giveGeneralAdvice = giveGeneralAdvice;
