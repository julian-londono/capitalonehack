function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function getCategoryIndex(categoryToFind, arr){
    for (let i = 0; i < arr.length; i++){
        if(arr[i].category === categoryToFind){
            return i;
        }
	}

    return -1;
}

module.exports.toTitleCase = toTitleCase;
module.exports.getCategoryIndex = getCategoryIndex;
