let fs = require('fs');

//(1). fetch the raw json
let usersJsonData = fs.readFileSync('users.json');
// console.log(usersJsonData);

//(2). get the json object which contains the array of users.
//NOTE: during 'writeFile()', this 'userJsonObject', is what is stringified and written, not the users array
let usersJsonObject = JSON.parse(usersJsonData);
console.log(usersJsonObject);

//(3). get the users array contained in the json object
let users = usersJsonObject.users;
// console.log(users);

//Repeat steps (1),(2),(3), for orders
let ordersJsonData = fs.readFileSync('orders.json'); //returns the raw json
// console.log(ordersJsonData);
let ordersJsonObject = JSON.parse(ordersJsonData); // returns the raw json as an object
// console.log(ordersJsonObject);
let orders = ordersJsonObject.orders; //returns the array of orders in the json object
// console.log(orders);



module.exports = {

/*========================================================================*/
 /*Returns an array of all orders*/
 getOrders: () => {
   console.log(orders);
     return orders;
   }, //DON'T FORGET THIS COMMA FOR CODES FURTHER DOWN
/*========================================================================*/

/*========================================================================*/
   /*Returns an array of all users*/
   getUsers: () => {
     console.log(users);
     return users;
   },//END getUsers
/*========================================================================*/

/*========================================================================*/
   /*Return a particular user object of the given id */
   getOrder: function (id) {                //using (id) => {...} did not work here.
     // let orders = this.getOrders();
     for(let i = 0; i < orders.length; i++) {
       if(orders[i].orderID === id) {
         console.log(orders[i]);
         return orders[i];
       }
     }//end for

     /* using 'for' works but not 'forEach' (as used below), I NEED TO FIGURE OUT WHY ! */
     // orders.forEach( order => {
     //   if (order.orderID === id) {
     //     return order;
     //   }
     // });

   },//END getOrder
   /*========================================================================*/

   /*========================================================================*/
   /* Return true if a user is registered */
   isRegisteredUser: function(username, password) {
     // let users = this.getUsers();

     // let fs = require('fs');
     // let usersJsonData = fs.readFileSync('users.json');
     // let usersJsonObject = JSON.parse(usersJsonData);
     // let users = usersJsonObject.users;

    //I tried a for loop here, it did not work (WHY!)
     for(let i = 0; i < users.length; i++) {
       if(users[i].username === username && users[i].password === password) {
         return true;
       }
     }
     return false;
   },//END isRegisteredUser
  /*========================================================================*/

  /*========================================================================*/
   /*Returns a valid new id for adding new orders or new users
     To get a new ID for a new user call the function and pass 'user' as argument
     e.g: getNewID('user').
     Too get a new ID for a new order call the function and pass 'order' as argument
     e.g: getNewID('order');
     It generates the ID by checking the highest existing ID and adds 1 to it to make
     a new ID, e.g if the higest existing ID is 014, the function returns 015 as the
     new ID */

   getNewID: function(string) {
     let arr = [];
     let lastID;

     if(string.toLowerCase() === 'user'){
       // users = this.getUsers();
       users.forEach(user => {
         arr.push( Number(user.userID.slice(1)) );
       });
       // arr.sort((a,b) => {a - b});
       lastID = arr[arr.length - 1];
       if(lastID + 1 < 10 ) {
         return "U00" + (lastID + 1).toString();
       }else if (lastID + 1 < 100) {
         return "U0" + (lastID + 1).toString();
       }else {
         return "U" + (lastID + 1).toString();
       }

     }else if(string.toLowerCase() === 'order') {
        // orders = this.getOrders();
        for (let i = 0; i < orders.length; i++) {
          arr.push( Number(orders[i].orderID.slice(1)) );
        }
        // arr.sort((a,b) => {a - b});
        lastID = arr[arr.length - 1];
        if(lastID + 1 < 10 ) {
          return "R00" + (lastID + 1).toString();
        }else if (lastID + 1 < 100) {
          return "R0" + (lastID + 1).toString();
        }else {
          return "R"(lastID + 1).toString();
        }
     }else {
       return "invalid argument";
     }

     // lastID = Number( arr[arr.length - 1] );

   },//END getNewID
/*========================================================================*/

/*========================================================================*/
/*If username already exists (ie. username has been taken), return true,
 else return false */
 isTaken: (username) => {
    for (let i = 0; i < users.length; i++ ) {
      if(users[i].username === username) {
        return true;
      }
    }//end for

    return false;
 },//END isTaken
/*========================================================================*/


/*========================================================================*/
registerUser: function (username, password, telephone, email) {
  let id = this.getNewID('user');
  let newUser = {
    "userID": id,
    "username": username,
    "password": password,
    "telephone": telephone,
    "email": email
  }

  users.push(newUser);
  let data = JSON.stringify(usersJsonObject, null, 2);
  fs.writeFile('users.json', data, function(err){
    if(err){
      return false;
    }else {
      return true;
    }
  });
  // console.log(users);
  // return users[users.length -1];
},
/*========================================================================*/

};//end module.exports
