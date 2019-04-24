const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

router.get("/", authenticated, (req, res) => {
  // Restaurant.find((err, restaurants) => {
  //   if (err) return console.error(err);
  //   return res.render("index", { restaurants });
  // });
  Restaurant.find({ userId: req.user._id }, (err, restaurants) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants });
  });
});

module.exports = router;
