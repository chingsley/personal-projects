const express = require('express');
const router = express.Router();
const messanger = require('./messangerFunctions/itemMessanger');

let items = messanger.getItems();


//Handle GET request for /items
router.get('/', (req, res, next) => {
    // res.status(200).json(itemsJsonObject); //Will GET an object containing an array of object
    res.status(200).json(items); // Will GET an array of objects
});


//Handle POST request for items
router.post('/', (req, res, next) => {
  let newID = messanger.getNewID();
  let item = {
    "itemID": newID,
    "foodName": req.body.foodName || null,
    "calorie": req.body.calorie || null,
    "unitPrice": req.body.unitPrice || null,
    "imageURL": req.body.imageURL || null,
    "imagePath": req.body.imagePath || null,
    "foodDescription": req.body.foodDescription || null
  }

  if(messanger.addItem(item)) {
    // console.log(req.body);
    res.status(201).json({
      message: 'New item added successfully!',
      newItem: messanger.getItem(newID),
      items: messanger.getItems()
    });
  }else {
    res.status(404).json({
      message: 'Failed to add new item'
    });
  }
});

//Hand GET request for a particular items specified by ID
router.get('/:itemID', (req, res, next) => {
    const id = req.params.itemID;
    items.forEach(item => {
        if(item.itemID === id) {
            res.status(200).json(item);
        }
    });
});

//Handle PUT request updating an item
router.put('/:itemID', (req, res, next) => {
  let id = req.params.itemID;
  let outcome = messanger.updateItem(id, req.body);
  if(outcome === true) {

    res.status(200).json({
      message: 'Update Successful!',
      item: messanger.getItem(id), //Returns the updated item
    });

  } else {

    res.status(404).json({
      message: 'Update failed!',
      item: messanger.getItem(id),
    });
  }
});

//Handle DELETE request to delete an item
router.delete('/:itemID', (req, res, next) => {
  let id = req.params.itemID;
  let outcome = messanger.deleteItem(id);

  if(outcome === true) {
      res.status(200).json({
        message: 'Item '+ id + ' deleted!',
        items: messanger.getItems(),
      });
  } else {
      res.status(404).json({
          message: 'Failed to Delete item ' + id,
          item: messanger.getItem(id)
      });
  }
});

module.exports = router;
