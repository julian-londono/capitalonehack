const express = require('express');
const router = express.Router();
const constants = require('../constants');

router.post('/', function(request, response) {
  // An action is a string used to identify what needs to be done in fulfillment
  let action = (request.body.queryResult.action) ? request.body.queryResult.action : 'default';

  // Parameters are any entites that Dialogflow has extracted from the request.
  let parameters = request.body.queryResult.parameters || {}; // https://dialogflow.com/docs/actions-and-parameters

  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.welcome': () => {
      sendResponse('Hello, Welcome to my Dialogflow agent!'); // Send simple response to user
    },
    'coinToss': () => {
      const randomNum = Math.floor(Math.random() * Math.floor(2));
      const response = (randomNum == 0) ? "Heads!" : "Tails!";
      sendResponse(response);
    },
    'college': () => {
      const firstName = parameters.firstName;
      const lastName = parameters.lastName; // null if optional
      console.log("firstName: " + firstName);
      const summiteer = findSummiteer(summiteers, firstName, lastName);
      if (summiteer) {
        sendResponse(firstName + " went to college at " + summiteer.college);
      }
      else {
        sendResponse("I don't know where " + firstName + " went to college.");
      }
    },
    'place': () => {
      //sample URL: https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=38.886879,-77.094652&radius=500&types=food&key=AIzaSyDDurGSXcMysnuRgFWjY7ehDaAwsD5UP60

      //hard-code lat/long to simplify things (3030 Clarendon Blvd, Arlington, VA)
      //normally you can get this from the google home
      const latitude = "38.886879";
      const longitude = "-77.094652";
      //place types: https://developers.google.com/places/supported_types
      const placeType = parameters.placeType;
      const placesAPIKey = "AIzaSyDDurGSXcMysnuRgFWjY7ehDaAwsD5UP60";
      const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&type=" + placeType + "&key=" + placesAPIKey;

      httpRequest({
        method: "GET",
        uri: url,
        json: true
      }).then(function (json) {
        const results = json.results;
        if(results.length == 0) {
          sendResponse("No places found nearby");
        }
        else {
          const firstPlace = results[0];
          sendResponse("I found a place called " + firstPlace.name + " with a rating of " + firstPlace.rating);
        }
      })
      .catch(function (err) {
        console.log("Error:" + err);
        sendResponse("There was a problem fetching place information");
      });
    },
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
  function sendResponse (responseToUser) {
    let responseJson = {fulfillmentText: responseToUser}; // displayed response
    response.json(responseJson); // Send response to Dialogflow
  }
});

module.exports = router;
