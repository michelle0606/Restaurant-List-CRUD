const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const { authenticated } = require("../config/auth");

//新增餐廳的頁面
router.get("/new", authenticated, (req, res) => {
  res.render("new");
});

//瀏覽其中一個餐廳的詳細資料
router.get("/:id", authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, store) => {
    if (err) return console.error(err);
    return res.render("show", { store: store });
  });
});

//把新增的餐廳加到資料庫
router.post("/", authenticated, (req, res) => {
  const restaurant = Restaurant(req.body);

  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

//編輯餐廳的頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, store) => {
    if (err) return console.error(err);
    return res.render("edit", { store: store });
  });
});

//將編輯好的內容儲存
router.put("/:id", authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    Object.assign(restaurant, req.body); //Object.assign(目標物件, 來源物件)

    restaurant.save(err => {
      // doc.save(callback); 回傳值：合併目標物件及(多個)來源物件所得到的最終物件。
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

//刪除餐廳
router.delete("/:id/delete", authenticated, (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
