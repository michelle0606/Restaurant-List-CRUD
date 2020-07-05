// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

app.use(
  session({
    secret: 'dkej49032jui4hf73iuh48329hu3jhrjkd',
    resave: 'false',
    saveUninitialized: 'false',
  })
)

require('./config/passport')(passport)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 載入 Passport config
require('./config/passport')(passport)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useCreateIndex: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //定義要使用的樣板引擎("名稱", "相關設定")
app.set('view engine', 'handlebars') //告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static('public')) // 告訴 Express 靜態檔案的資料夾位置

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/sort', require('./routes/sort'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

app.listen(process.env.PORT || port, () => {
  console.log('App is running')
})
