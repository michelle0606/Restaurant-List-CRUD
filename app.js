// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" })); //定義要使用的樣板引擎("名稱", "相關設定")
app.set("view engine", "handlebars"); //告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static("public")); // 告訴 Express 靜態檔案的資料夾位置

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/restaurants/:store_id", (req, res) => {
  console.log("req.params.store_id", req.params.store_id);
  const store = restaurantList.results.filter(
    store => Number(store.id) === Number(req.params.store_id)
  );
  console.log(store);

  res.render("show", { store: store[0] });
});

app.get("/search", (req, res) => {
  console.log("req.query", req.query);
  const keyword = req.query.keyword;
  const stores = restaurantList.results.filter(store => {
    return store.name.includes(keyword) || store.category.includes(keyword);
  });

  res.render("index", { restaurants: stores, keyword: keyword });
});

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
