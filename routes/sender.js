const express = require("express");
const router = express.Router();
require("dotenv").config()

const MongoClient = require("mongodb").MongoClient;
const urldb = process.env.DB;

const WebSocket = require("ws");
const client = new WebSocket("ws://localhost:8880")


router.post("/", (req, res) => {

        MongoClient.connect(urldb, function (err, db) {
            const dbID = db.db("NebioloTV");
        
            if (err) throw err;

            dbID.collection("athletes").find({number: req.body.number}).toArray(function(err, result){

                if (err) throw err;

                if(result == "") {
                    console.log("Error: NO matching ATHLETE FOUND!")
                    let number = req.body.number;
                    let name = "ERRORE";
                    let club = "ERRORE";
                    let race = "ERRORE";
                    let type = "ERRORE";
                    let error = "matching"
                    res.render("public/sender", {
                        number,
                        name,
                        club,
                        race,
                        type,
                        error
                    });
                } else {

                    let number = result[0].number;
                    let name = result[0].name;
                    let club = result[0].club;
                    let race = result[0].race;
                    let type = req.body.type
                    let error 

                    let jsonData = {
                        number: number,
                        name: name,
                        club: club,
                        race: race,
                        type: type
                    }

                    let jsonString = JSON.stringify(jsonData);
                    client.send(jsonString)
                    res.render("public/sender", {
                        number,
                        name,
                        club,
                        race,
                        type,
                        error
                    });
                }

            });
        });

});

router.get("/", (req, res) => {

    let number
    let name
    let club
    let race
    let type
    let error

    res.render("public/sender", {
        number,
        name,
        club,
        race,
        type,
        error
    });

});

module.exports = router;
