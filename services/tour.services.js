// const Product = require("../models/Product");

const Tour = require("../models/Tour");

exports.getTourService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Tour.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, tours, page };
};

exports.getChepestToursService = async () => {
  const tours = await Tour.find({}).limit(3).sort("price");
  return tours;
};

// exports.getProductService = async (filters, queries) => {
//   const products = await Product.find(filters)
//     .skip(queries.skip)
//     .limit(queries.limit)
//     .select(queries.fields)
//     .sort(queries.sortBy);
//   const total = await Product.countDocuments(filters);
//   const page = Math.ceil(total / queries.limit);
//   return { total, products, page };
// };

exports.createTourServices = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

// exports.bulkUpdateProductByIdService = async (prodictId, data) => {
//   const result = await Product.updateOne(
//     { _id: prodictId },
//     { $inc: data },
//     {
//       runValidators: true,
//     }
//   );

//   // const product = await Product.findById(prodictId);
//   // const result = await product.set(data).save();

//   return result;
// };
