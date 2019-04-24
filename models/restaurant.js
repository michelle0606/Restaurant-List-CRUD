const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true
  }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
// module.exports = mongoose.model("Restaurant", restaurantSchema); 第一個參數是collection的名字，系統會自動轉換為複數小寫；第二個參數是設定好的Schema；另外還可以再傳第三個參數，代表要對應的 collection，如果沒有給的話就會自動用第一個參數 ( model 名稱)。
