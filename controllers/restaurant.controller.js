const Restaurant = require("../models/restaurant.model");
const mongoose = require("mongoose");

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

exports.getCategoryName = async (req, res) => {
  try {
    const getCategoryName = await Restaurant.find({
      category: req.params.id,
    });
    res.status(200).send(getCategoryName);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant",
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const getRestaurantById = await Restaurant.findById(req.params.id);
    res.status(200).send(getRestaurantById);
  } catch (err) {
    res.status(404).send({
      message: "No restaurant found with the given id",
    });
  }
};
exports.getRating = async (req, res) => {
  try {
    const getRating = await Restaurant.find({
      rating: { $gte: req.params.value },
    });
    res.status(200).send(getRating);
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while fetching the Restaurant",
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Restaurant data is required",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "Invalid ID format",
      });
    }
    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updateRestaurant === null) {
      return res.status(200).send({
        message: "No restaurant found with the given id",
      });
    }
    res.status(200).send({
      message: "Restaurant updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Some error occurred while updating the Restaurant",
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (deleteRestaurant === null) {
      return res.status(200).send({
        restaurant: deleteRestaurant,
        message: "Restaurant deleted successfully",
      });
    }
    res.status(200).send({
      restaurant: deleteRestaurant,
      message: "Restaurant deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while deleting the Restaurant",
    });
  }
};
