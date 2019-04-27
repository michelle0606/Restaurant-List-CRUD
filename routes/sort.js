const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

router.get("/:sort", authenticated, (req, res) => {
  const order = req.params.sort;
  if (order === "rating") {
    Restaurant.find({ userId: req.user._id })
      .sort({ rating: "-1" })
      .exec((err, restaurants) => {
        if (err) return console.error(err);
        return res.render("index", { restaurants });
      });
  } else if (order === "asc") {
    Restaurant.find({ userId: req.user._id })
      .sort({ name: "1" })
      .exec((err, restaurants) => {
        if (err) return console.error(err);
        return res.render("index", { restaurants });
      });
  } else {
    Restaurant.find({ userId: req.user._id })
      .sort({ name: "-1" })
      .exec((err, restaurants) => {
        if (err) return console.error(err);
        return res.render("index", { restaurants });
      });
  }
});

module.exports = router;
