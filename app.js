// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./models/seeds/restaurant.json");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected!");
});

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" })); //定義要使用的樣板引擎("名稱", "相關設定")
app.set("view engine", "handlebars"); //告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static("public")); // 告訴 Express 靜態檔案的資料夾位置
app.use(bodyParser.urlencoded({ extended: true }));

const Restaurant = require("./models/restaurant");

// routes setting

//瀏覽所有餐廳
app.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render("index", { restaurants: restaurants });
  });
});

//瀏覽其中一個餐廳的詳細資料
app.get("/restaurants/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, store) => {
    if (err) return console.error(err);
    return res.render("show", { store: store });
  });
});

//搜尋餐廳  //要處理這個部分的詳細資料無法正常顯示
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(store => {
    return store.name.includes(keyword) || store.category.includes(keyword);
  });

  res.render("index", { restaurants: restaurants, keyword: keyword });
});

//新增餐廳的頁面
app.get("/restaurant/new", (req, res) => {
  res.render("new");
});

//把新增的餐廳加到資料庫
app.post("/restaurants", (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  });

  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});

//編輯餐廳的頁面
app.get("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, store) => {
    if (err) return console.error(err);
    return res.render("edit", { store: store });
  });
});

//將編輯好的內容儲存
app.post("/restaurants/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    console.log(req.params.id);
    if (err) return console.error(err);
    restaurant.name = req.body.name;
    restaurant.name_en = req.body.name_en;
    restaurant.category = req.body.category;
    restaurant.image = req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.google_map = req.body.google_map;
    restaurant.rating = req.body.rating;
    restaurant.description = req.body.description;

    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

//刪除餐廳
app.post("/restaurants/:id/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
