let fs = require('fs');

module.exports = {


 /*Returns an array of all orders*/
 getOrders: () => {
     let jsonData = fs.readFileSync('orders.json'); //returns the raw json
     let jsonObject = JSON.parse(jsonData); // returns the raw json as an object
     let orders = jsonObject.orders; //returns the array of orders in the json object
     // console.log(orders);
     return orders;
   },

   /*Returns an array of all users*/
   getUsers: () => {
     let jsonData = fs.readFileSync('users.json');
     let jsonObject = JSON.parse(jsonData);
     let users = jsonObject.users;
     // console.log(users);
     return users;
   },

   /*Return a particular user object of the given id */
   getOrder: function (id) {
     let orders = this.getOrders();
     // orders.forEach( order => {
     //   if (order.orderID === id) {
     //     return order;
     //   }
     // });

     for(let i = 0; i < orders.length; i++) {
       if(orders[i].orderID === id) {
         console.log(orders[i]);
         return orders[i];
       }
     }//end for

   }
};
