// ROUTE FILE BASE URI IS '/'

const express = require('express');
const router = express.Router();

const constants = require('../constants'); // separate module for constants
const helpers = require('../custom/helpers'); // custom helpers we can use
const utilities = require('../custom/utilities'); // general utilities

const user_data = require('../userdata.json'); // static user data
const user_credentials = require('../credentials.json'); // user credentials
const current_user = user_credentials.name;

// POST '/'
router.post('/', function(req, res) {
    // An action is a string used to identify what needs to be done in fulfillment
    let action = (req.body.queryResult.action) ? req.body.queryResult.action : 'default';

    // Parameters are any entites that Dialogflow has extracted from the request.
    let parameters = req.body.queryResult.parameters || {}; // https://dialogflow.com/docs/actions-and-parameters

    // Create handlers for Dialogflow actions as well as a 'default' handler
    const actionHandlers = {
        // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
        'input.welcome': () => {
            sendResponse('Hey there!'); // Send simple response to user
        },
        'actionAnalysis': () => {
            // Analysis of user financial behaviours

            const actionType = req.body.queryResult.parameters.entityAnalysis; //Transactions, Habits, and Advice
            console.log(actionType)

            sendResponse('No logic here for actionAnalysis...awkward...');
        },
        'actionAvailable': () => {
            // Get avaliable credit
            const firstUsersData = user_data.Users[0]; // Extract The User's specific data
            const response = `Sure ${firstUsersData.name}, you have $${firstUsersData.remainingCredit} of credit left for this month.`; // Format Response
            sendResponse(response);
        },
        'actionBalance': () => {
            // Get amount in savings or checking account

            let response = 'Trouble fetching account balance data.'
            let accountType = req.body.queryResult.parameters.entityBalance;

            if(accountType){
                if(accountType === 'Savings'){
                    // User is asking for savings
                    response = `Your savings account has $${helpers.getAccountBalance('savings')}.`;
                } else if(accountType === 'Checking'){
                    // User is asking for checking
                    response = `Your checking account has $${helpers.getAccountBalance('balance')}.`;
                } else if(accountType === 'Credit'){
                    // User is asking for checking
                    response = `You have $${helpers.getAccountBalance('remainingCredit')} of remaining credit.`;
                } else{
                    // Other

                }
            } else {
                // Tell about savings and checking account
                response = `Your savings account has $${helpers.getAccountBalance('savings')} and
                            your checking account has $${helpers.getAccountBalance('balance')}`;
            }

            sendResponse(response);
        },
        'actionTransactions': () => {
            // Get recent transactions
            let num = req.body.queryResult.parameters["number"];
            if(!num){
              num = 5;
            }
            let response = helpers.getTrans(num);
            sendResponse(response);
        },
        'actionBillDates': () => {
            // Get a certain type of bill's due date

            sendResponse('No logic here for actionBillDates...awkward...');
        },
        'actionSpending': () => {
            // Get amount spent on certain types of categories

            sendResponse('No logic here for actionSpending...awkward...');
        },
        'actionPurchases': () => {
            // Get large or worrying purchases

            let response = "Couldn't figure that out...maybe ask me something else?"; //Default response if nothing decided

            let lowerAmountBoundary = req.body.queryResult.parameters["unit-currency"].amount;
            let numberToDisplay = req.body.queryResult.parameters["numTransactions"];

            if(!lowerAmountBoundary){
                // If no lower boundary give hardcode it here just for demo purposes
                lowerAmountBoundary = 50;
            }

            if(!numberToDisplay){
                // If no lower boundary give hardcode it here just for demo purposes
                numberToDisplay = 3;
            }

            response = helpers.getLargePurchases(lowerAmountBoundary, numberToDisplay);

            sendResponse(response);
        },
        'actionBillPay': () => {
            // Pay a certain type of specified bill type
            let billType = parameters.billType;
            if (billType != undefined) {
                billType = helpers.toTitleCase(billType);
            }

            let response = helpers.getBills(billType);
            sendResponse(response);
        },
        'actionSubscription': () => {
            // Get any subscriptions a user has

            sendResponse('No logic here for actionSubscription...awkward...');
        },
        // ,
        // 'place': () => {
        //     //sample URL: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.886879,-77.094652&radius=500&types=food&key=AIzaSyDDurGSXcMysnuRgFWjY7ehDaAwsD5UP60
        //
        //     //hard-code lat/long to simplify things (3030 Clarendon Blvd, Arlington, VA)
        //     //normally you can get this from the google home
        //     const latitude = "38.886879";
        //     const longitude = "-77.094652";
        //     //place types: https://developers.google.com/places/supported_types
        //     const placeType = parameters.placeType;
        //     const placesAPIKey = "AIzaSyDDurGSXcMysnuRgFWjY7ehDaAwsD5UP60";
        //     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&type=" + placeType + "&key=" + placesAPIKey;
        //
        //     httpRequest({
        //         method: "GET",
        //         uri: url,
        //         json: true
        //     }).then(function(json) {
        //         const results = json.results;
        //         if (results.length == 0) {
        //             sendResponse("No places found nearby");
        //         } else {
        //             const firstPlace = results[0];
        //             sendResponse("I found a place called " + firstPlace.name + " with a rating of " + firstPlace.rating);
        //         }
        //     })
        //     .catch(function(err) {
        //         console.log("Error:" + err);
        //         sendResponse("There was a problem fetching place information");
        //     });
        // }

        // Default handler for unknown or undefined actions
        'default': () => {
            sendResponse("I don't know, please try again.");
        }
    };

    // If undefined or unknown action use the default handler
    if (!actionHandlers[action]) {
        action = 'default';
    }
    // Run the proper handler function to handle the request from Dialogflow
    actionHandlers[action]();

    /*
    * Helper function to send correctly formatted responses to Dialogflow which are then sent to the user
    */
    function sendResponse(responseToUser) {
        let responseJson = {
            fulfillmentText: responseToUser
        }; // displayed response
        return res.json(responseJson); // Send response to Dialogflow
    }

});

module.exports = router;
