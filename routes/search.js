const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

//搜尋餐廳
router.get("/", (req, res) => {
  const keyword = RegExp(`${req.query.keyword}`, "i");
  Restaurant.find(
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
