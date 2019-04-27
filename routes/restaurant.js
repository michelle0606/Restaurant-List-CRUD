const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");
const User = require("../models/user");
const { authenticated } = require("../config/auth");

//新增餐廳的頁面
router.get("/new", authenticated, (req, res) => {
  res.render("new");
});

//搜尋與排序餐廳
router.get("/search", authenticated, (req, res) => {
  const key = req.query.keyword;
  const keyword = RegExp(`${req.query.keyword}`, "i");
  Restaurant.find(
    { $or: [{ name: keyword }, { category: keyword }] },
    (err, restaurants) => {
      if (err) return console.error(err);
      if (`${restaurants[0].userId}` === `${req.user._id}`) {
        return res.render("index", { restaurants, key });
      } else {
        return res.render("index", { key });
      }
    }
  );
});

//瀏覽其中一個餐廳的詳細資料
router.get("/:id", authenticated, (req, res) => {
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, store) => {
      if (err) return console.error(err);
      return res.render("show", { store: store });
    }
  );
});

//把新增的餐廳加到資料庫
router.post("/", authenticated, (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id
  });

  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

//編輯餐廳的頁面
router.get("/:id/edit", authenticated, (req, res) => {
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, store) => {
      if (err) return console.error(err);
      return res.render("edit", { store: store });
    }
  );
});

//將編輯好的內容儲存
router.put("/:id", authenticated, (req, res) => {
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.error(err);
      Object.assign(restaurant, req.body); //Object.assign(目標物件, 來源物件)

      restaurant.save(err => {
        // doc.save(callback); 回傳值：合併目標物件及(多個)來源物件所得到的最終物件。
        if (err) return console.error(err);
        return res.redirect(`/restaurants/${req.params.id}`);
      });
    }
  );
});

//刪除餐廳
router.delete("/:id/delete", authenticated, (req, res) => {
  Restaurant.findById(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.error(err);
      restaurant.remove(err => {
        if (err) return console.error(err);
        return res.redirect("/");
      });
    }
  );
});

module.exports = router;
