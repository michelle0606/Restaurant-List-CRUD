// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

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

app.use("/sort", require("./routes/sort"));
app.use("/restaurants", require("./routes/restaurant"));
app.use("/", require("./routes/home"));
app.use("/search", require("./routes/search"));
app.use("/users", require("./routes/user"));

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
