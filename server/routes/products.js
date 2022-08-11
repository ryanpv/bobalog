const { Router } = require("express");
const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn.js")
const ObjectId = require("mongodb").ObjectId;

///////////////////////////////////////////////////////////////////////////////////

// To GET entire collection 
recordRoutes.route("/products").get(function (req, res) {
    let db_connect = dbo.getDb("bobalist")
    db_connect
    .collection("bobalist")
    .find({})
    .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// To GET single record 
recordRoutes.route("/product/:id").get(function (req, res) {
    let db_connect = dbo.getDb()
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
    .collection("bobalist")
    .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

// To POST a record 
recordRoutes.route("/product/add").post(function (req, res) {
    let db_connect = dbo.getDb()
    let newobj = {
        name: req.body.name,
        topping: req.body.topping,
        ice: req.body.ice,
        sugar: req.body.sugar
    };
    db_connect
    .collection("bobalist")
    .insertOne(newobj, function (err, response) {
        if (err) throw err;
        res.json(response);
    });
});

// To UPDATE a record 
recordRoutes.route("/update/:id").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            name: req.body.name,
            topping: req.body.topping,
            ice: req.body.ice,
            sugar: req.body.sugar
        },
    }
    db_connect
    .collection("bobalist").updateOne(myquery, newvalues)
});

// To DELETE a record 
recordRoutes.route("/:id").delete(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) }
    db_connect
    .collection("bobalist")
    .deleteOne(myquery, function (req, response) {
        if (err) throw err;
        console.log("successfully deleted 1 doc");
        res.json(response);
    })
});

module.exports = recordRoutes