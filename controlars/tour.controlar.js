const Tour = require("../models/Tour");
const {
  createTourServices,
  getTourService,
  getChepestToursService,
  updateTourByIdService,
} = require("../services/tour.services");

module.exports.getTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach((find) => delete filters[find]);

    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};
    if (req.query.sort) {
      // price,quantity -> "price quantity"
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const product = await getTourService(filters, queries);
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      message: "can't get data",
      error: error.message,
    });
  }
};

module.exports.createTour = async (req, res, next) => {
  try {
    const result = await createTourServices(req.body);
    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

module.exports.chepestTours = async (req, res, next) => {
  try {
    const result = await getChepestToursService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      message: "can't get data",
      error: error.message,
    });
  }
};

exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateTourByIdService(id, req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could't update th product",
      error: error.message,
    });
  }
};
