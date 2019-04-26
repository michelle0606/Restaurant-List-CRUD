const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

//搜尋餐廳
router.get("/", authenticated, (req, res) => {
  const keyword = RegExp(`${req.query.keyword}`, "i");
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    {
      $or: [{ name: keyword }, { category: keyword }]
    },
    (err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants });
    }
  );
});

module.exports = router;
