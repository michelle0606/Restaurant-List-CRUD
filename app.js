// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

mongoose.set("debug", true);
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
app.use(methodOverride("_method"));

const Restaurant = require("./models/restaurant");

app.use("/sort", require("./routes/sort"));
app.use("/restaurants", require("./routes/restaurant"));
app.use("/", require("./routes/home"));

//搜尋餐廳
app.get("/search", (req, res) => {
  Restaurant.find((err, restaurants) => {
    const keyword = req.query.keyword;
    if (err) return console.error(err);
    const restaurant = restaurants.filter(store => {
      return store.name.includes(keyword) || store.category.includes(keyword);
    });

    return res.render("index", {
      restaurants: restaurant,
      keyword: keyword
    });
  });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
