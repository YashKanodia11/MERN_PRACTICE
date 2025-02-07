const express = require("express");
let mongodb = require("mongodb");
//import url
let url = require("./url");
//create mongoclient
let mcl = mongodb.MongoClient;
//create router instance
let router = express.Router();
//create rest api
router.post("/", (req, res) => {
  let obj = {
    p_id: req.body.p_id,
    p_name: req.body.p_name,
    p_cost: req.body.p_cost,
  };
  //connect to mongodb
  mcl.connect(url, (err, conn) => {
    if (err) console.log("Error in connection");
    else {
      let db = conn.db("newnodedb");
      db.collection("products").insertOne(obj, (err) => {
        if (err) res.send({ insert: "error" });
        else {
          console.log("Data inserted");
          res.json({ insert: "success" });
          conn.close();
        }
      });
    }
  });
});
module.exports = router;

