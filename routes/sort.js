const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

router.get("/rating", authenticated, (req, res) => {
  Restaurant.find({})
    .sort({
      rating: "-1"
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants });
    });
});

router.get("/asc", authenticated, (req, res) => {
  Restaurant.find({})
    .sort({
      name: "1"
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants });
    });
});

router.get("/desc", authenticated, (req, res) => {
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
