let fs = require('fs');
let itemsJsonData = fs.readFileSync('items.json');
let itemsJsonObject = JSON.parse(itemsJsonData);
let items = itemsJsonObject.items; //items is the array of item objects

/*The saveChanges() function persists changes to memory (JSON FILE)
If the process is successful, it returns true (using the 'outcome' variable)
otherwise, it returns false. NOTICE: This function is not exorted */
function saveChanges() {
  let outcome = true;
  let data = JSON.stringify(itemsJsonObject, null, 2);
  fs.writeFile('items.json', data, function(err){
    if(err) outcome = false;
  });
  return outcome;
}
/*==================================================================*/

module.exports = {

/*________________________________________________________________*/
    getItems: () => { //Get all the items (an array of item objects)
      return items;
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
    getItem: (id) => {

      for(let i = 0; i < items.length; i++) {
        if(items[i].itemID === id) {
          return items[i];
        }//end if
      }//end for

      return {error:'The specified ID does not match any item in our system'};
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
    updateItem: (id, obj) => {
        let matchFound = false;

        for(let i = 0; i < items.length; i++) {
          if(items[i].itemID === id) {
            matchFound = true;
            items[i].foodName = obj.foodName || items[i].foodName;
            items[i].calorie = obj.calorie || items[i].calorie;
            items[i].unitPrice = obj.unitPrice || items[i].unitPrice;
            items[i].imagePath = obj.imagePath || items[i].imagePath;
            items[i].foodDescription = obj.foodDescription || items[i].foodDescription;
          }//end if
        }//end for

        if(matchFound) {
          return saveChanges();
        }
        /*If match is not found, undefined will be returned,
        and undefined is a falsy value*/
    },
/*________________________________________________________________*/


/*________________________________________________________________*/
    deleteItem: (id) => {
      let matchFound = false;
      let deletedItem = {};
      for(let i = 0; i < items.length; i++ ) {
        if(items[i].itemID === id) {
          matchFound = true;
          deletedItem = (items.splice(i, 1))[0];
          /*Recall that splice returns an array of deleted items.
          So, we get the actual deleted item by using index [0]*/
        }
      }

      if(matchFound) {
        console.log(deletedItem);
        return saveChanges();
      }
    },
/*________________________________________________________________*/


/*________________________________________________________________*/
/*The getNewID() function generates a new ID for a new items during
 POST method by adding 1 to the highest ID in the array */
getNewID:  () => {
    let arr = [];
    let lastID;

   for (let i = 0; i < items.length; i++) {
     arr.push( Number(items[i].itemID.slice(1)) );
   }
   arr.sort((a,b) => a - b);
   lastID = arr[arr.length - 1];
   if((lastID + 1) < 10 ) {
     return "F00" + (lastID + 1).toString();
   }else if ((lastID + 1) < 100) {
     return "F0" + (lastID + 1).toString();
   }else {
     return "F"(lastID + 1).toString();
   }
},
/*________________________________________________________________*/

/*________________________________________________________________*/
addItem: (item) => {
    items.push(item);
    return saveChanges();
},
/*________________________________________________________________*/


}//END module.exports
