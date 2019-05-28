const express = require("express");
const router = express.Router();

const Item = require("../../schema.js")

// Get all items
router.get("/", (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// Get a certain item
router.get("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
});

// Post a new item
router.post("/", (req, res) => {
    const newItem = new Item(req.body);

    newItem.save().then(item => res.json(item));
});

// Update an item
router.post("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.description = req.body.description;
            item.amount = req.body.amount;
            item.type_name = req.body.type_name;
            item.incomeBool = req.body.incomeBool;

            item.save().then(item => {
                res.json(item);
            })
            .catch(err => {
                res.status(400).send("Update failed");
            });
        });

});

// Delete an item
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).send("Delete failed"));
});

module.exports = router;