// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

app.use(
  session({
    secret: "dkej49032jui4hf73iuh48329hu3jhrjkd" // secret: 定義一組自己的私鑰（字串)
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 載入 Passport config
require("./config/passport")(passport);

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

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
