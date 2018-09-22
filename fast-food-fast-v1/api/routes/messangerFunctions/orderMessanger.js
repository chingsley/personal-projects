let fs = require('fs');
let ordersJsonData = fs.readFileSync('orders.json');
let ordersJsonObject = JSON.parse(ordersJsonData);
let orders = ordersJsonObject.orders; //orders is the array of order objects

/*The saveChanges() function persists changes to memory (JSON FILE)
If the process is successful, it returns true (using the 'outcome' variable)
otherwise, it returns false. NOTICE: This function is not exorted */
function saveChanges() {
  let outcome = true;
  let data = JSON.stringify(ordersJsonObject, null, 2);
  fs.writeFile('orders.json', data, function(err){
    if(err) outcome = false;
  });
  return outcome;
}
/*==================================================================*/

module.exports = {

/*________________________________________________________________*/
    getOrders: () => { //Get all the orders (an array of order objects)
      return orders;
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
    getOrder: (id) => {

      for(let i = 0; i < orders.length; i++) {
        if(orders[i].orderID === id) {
          return orders[i];
        }//end if
      }//end for

      return {error:'The specified ID does not match any order in our system'};
    },
/*________________________________________________________________*/

/*________________________________________________________________*/
    updateOrder: (id, obj) => {
        let matchFound = false;

        for(let i = 0; i < orders.length; i++) {
          if(orders[i].orderID === id) {
            matchFound = true;
            orders[i].foodName = obj.foodName || orders[i].foodName;
            orders[i].calorie = obj.calorie || orders[i].calorie;
            orders[i].unitPrice = obj.unitPrice || orders[i].unitPrice;
            orders[i].imagePath = obj.imagePath || orders[i].imagePath;
            orders[i].foodDescription = obj.foodDescription || orders[i].foodDescription;
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
    deleteOrder: (id) => {
      let matchFound = false;
      let deletedOrder = {};
      for(let i = 0; i < orders.length; i++ ) {
        if(orders[i].orderID === id) {
          matchFound = true;
          deletedOrder = (orders.splice(i, 1))[0];
          /*Recall that splice returns an array of deleted orders.
          So, we get the actual deleted order by using index [0]*/
        }
      }

      if(matchFound) {
        console.log(deletedOrder);
        return saveChanges();
      }
    },
/*________________________________________________________________*/


/*________________________________________________________________*/
/*The getNewID() function generates a new ID for a new orders during
 POST method by adding 1 to the highest ID in the array */
getNewID:  () => {
    let arr = [];
    let lastID;

   for (let i = 0; i < orders.length; i++) {
     arr.push( Number(orders[i].orderID.slice(1)) );
   }
   arr.sort((a,b) => a - b);
   lastID = arr[arr.length - 1];
   if((lastID + 1) < 10 ) {
     return "R00" + (lastID + 1).toString();
   }else if ((lastID + 1) < 100) {
     return "R0" + (lastID + 1).toString();
   }else {
     return "R"(lastID + 1).toString();
   }
},
/*________________________________________________________________*/

/*________________________________________________________________*/
addOrder: (order) => {
    orders.push(order);
    return saveChanges();
},
/*________________________________________________________________*/


}//END module.exports
