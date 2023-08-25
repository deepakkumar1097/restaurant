const restaurantController = require("../controllers/restaurant.controller");

module.exports = function (app) {
  app.post("/api/restaurant/add", restaurantController.addRestaurant);
  app.get("/api/restaurant/", restaurantController.getRestaurants);
};
