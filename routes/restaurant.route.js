const restaurantController = require("../controllers/restaurant.controller");

module.exports = function (app) {
  app.post("/api/restaurant/add", restaurantController.addRestaurant);
  app.get("/api/restaurant/", restaurantController.getRestaurants);
  app.get("/api/restaurant/categories", restaurantController.getCategories);
  app.get(
    "/api/restaurant/categories/:id",
    restaurantController.getCategoryName
  );
  app.get("/api/restaurant/:id", restaurantController.getRestaurantById);
  app.get("/api/restaurant/rating/:value", restaurantController.getRating);

  app.put("/api/restaurant/:id", restaurantController.updateRestaurant);

  app.delete("/api/restaurant/:id", restaurantController.deleteRestaurant);
};
