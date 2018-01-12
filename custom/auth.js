// Module for pseudo auth and user data extraction

const credentials = require("../credentials.json");
const user_data = require('../userdata.json'); // static user data

function getCurrentUserData(){
	for(let i = 0; i < user_data.Users.length; i++){
		if(user_data.Users[i].name === credentials.name){
			return user_data.Users[i];
		}
	}

	return user_data.Users[0];
}

module.exports.getCurrentUserData = getCurrentUserData;
