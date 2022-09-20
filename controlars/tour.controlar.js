const Tour = require("../models/Tour");
const {
  createTourServices,
  getTourService,
  getChepestToursService,
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

// module.exports.createProduct = async (req, res, next) => {
//   try {
//     // save or create

//     const result = await createProductServices(req.body); // if don't need update

//     // result.loggers();

//     // const product = new Product(req.body);

//     // console.log(product.quantity);
//     // if (product.quantity == 0) {
//     //   product.status = "out-of-stock";
//     // }
//     // const result = await product.save();

//     res.status(200).json({
//       status: "success",
//       message: "Data inserted successfully!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Data is not inserted",
//       error: error.message,
//     });
//   }
// };

// exports.updateProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await updatePRoductService(id, req.body);
//     res.status(200).json({
//       status: "Success",
//       message: "Successfully updated the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Could't update th product",
//       error: error.message,
//     });
//   }
// };

// exports.bulkUpdateProduct = async (req, res, next) => {
//   try {
//     const result = await bulkDeleteProductByIdService(req.body);
//     res.status(200).json({
//       status: "Success",
//       message: "Successfully updated the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Could't update the product",
//       error: error.message,
//     });
//   }
// };
// exports.deleteProductById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     if (!result.deletedCount) {
//       return res.statue(400).json({
//         status: "fail",
//         error: "Could't delete the product",
//       });
//     }
//     const result = await deleteProdectByIdService(id);
//     res.status(200).json({
//       status: "Success",
//       message: "Successfully Deleted the product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Could't Delete the product",
//       error: error.message,
//     });
//   }
// };

// exports.bulkDeleteProduct = async (req, res, next) => {
//   try {
//     const result = await bulkDeleteProductByIdService(req.body);

//     res.status(200).json({
//       status: "Success",
//       message: "Successfully deleted the given product",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "Could't deleted the given product",
//       error: error.message,
//     });
//   }
// };
