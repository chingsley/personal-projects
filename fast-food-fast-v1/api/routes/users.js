const express = require('express');
const router = express.Router();

let fs = require('fs');
let usersJsonData = fs.readFileSync('users.json');
let usersJsonObject = JSON.parse(usersJsonData);
// console.log(usersJsonObject);
let users = usersJsonObject.users;

//Handle GET request for /users
router.get('/', (req, res, next) => {
    // res.status(200).json(usersJsonObject); //Will GET an object containing an array of object
    res.status(200).json(users); // Will GET an array of objects
});

//Handle POST request to add an user
router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Create a new user'
  });
});

//Handle GET request for a particular users specified by ID
router.get('/:userID', (req, res, next) => {
    const id = req.params.userID;
    users.forEach(user => {
        if(user.userID === id) {
            res.status(200).json(user);
        }
    });
});

//Handle PUT request updating an user, like setting the status of an user: "pending", "complete", or "declined"
router.put('/:userID', (req, res, next) => {
  res.status(200).json({
    message: 'Handling PUT request to edit and update a particular user',
    id: req.params.userID
  });
});

//Handle DELETE request to delete an user
router.delete('/:userID', (req, res, next) => {
  res.status(200).json({
    message: 'Handling DELETE request to delete a particular user',
    id: req.params.userID
  });
});


module.exports = router;
