const mongoose = require("mongoose");
const Restaurant = require("../restaurant");

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  const restaurantList = require("./restaurant.json");
  const results = restaurantList.results;
  // console.log(results);

  for (let i in results) {
    Restaurant.create({
      store_id: `${results[i].id}`,
      name: `${results[i].name}`,
      name_en: `${results[i].name_en}`,
      category: `${results[i].category}`,
      image: `${results[i].image}`,
      location: `${results[i].location}`,
      phone: `${results[i].phone}`,
      google_map: `${results[i].google_map}`,
      rating: `${results[i].rating}`,
      description: `${results[i].description}`
    });
  }

  console.log("done!");
});
