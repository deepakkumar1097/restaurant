const Restaurant = require("../models/restaurant.model");

exports.addRestaurant = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const queryObj = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      imageURL: req.body.imageURL,
      location: req.body.location,
      phone: req.body.phone,
      rating: req.body.rating,
    };
    const addRestaurant = await Restaurant.create(queryObj);
    res.status(200).send(addRestaurant);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Some error occurred while creating the Restaurant",
    });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const getRestaurants = await Restaurant.find();
    res.status(200).send({
      restaurants: getRestaurants,
      message: "Restaurants fetched successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching the restaurants.",
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const getCategories = await Restaurant.distinct("category");
    res.status(200).send(getCategories);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching Categories",
    });
  }
};
