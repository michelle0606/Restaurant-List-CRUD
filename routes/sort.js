const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

router.get("/rating", (req, res) => {
  Restaurant.find({})
    .sort({
      rating: "-1"
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants });
    });
});

router.get("/asc", (req, res) => {
  Restaurant.find({})
    .sort({
      name: "1"
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants });
    });
});

router.get("/desc", (req, res) => {
  Restaurant.find({})
    .sort({
      name: "-1"
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants });
    });
});

module.exports = router;
