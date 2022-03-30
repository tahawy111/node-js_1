const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
// const { MongoClient } = require("mongodb");

const bodyParser = require("body-parser");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "statics")));

app.get("/", (req, res, next) => {
  res.render("index");
});
app.post("/", bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return console.log(err);
    }

    // Specify database you want to access
    const db = client.db("FirstDB");

    const courses = db.collection("users");
    courses
      .insertOne({ name: req.body.name, age: +req.body.age })
      .then((result) => {
        console.log(result);
        res.redirect("/");
      });

    courses.find().toArray((err, results) => {
      console.log(results);
    });

    console.log(`MongoDB Connected: ${url}`);
  });
});

app.listen(3000, () => console.log("server is listen on port 3000"));
