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

exports.updateTourByIdService = async (id, data) => {
  console.log(id, data);
  const result = await Tour.updateOne(
    { _id: id },
    { $set: data },
    {
      runValidators: true,
    }
  );
};

exports.createTourServices = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

exports.getProductByIdService = async (id) => {
  const foundData = await Tour.findOne({ _id: id });
  const updateData = foundData.viewCount + 1;
  const result = await Tour.updateOne(
    { _id: id },
    { $set: { viewCount: updateData } }
  );
  return foundData;
};

exports.getTrendingToursService = async () => {
  const tours = await Tour.find({}).limit(3).sort("-viewCount");
  return tours;
};

// exports.updateViewCountService = async (id, data) => {
//   // const foundData = await Tour.findOne({ _id: id });
//   // const updateData = foundData.viewCount + 1;
//   // const result = await Tour.updateOne(
//   //   { _id: id },
//   //   { $set: { viewCount: updateData } },
//   //   {
//   //     runValidators: true,
//   //   }
//   // );
//   // const result = await Tour.updateMany(
//   //   {},
//   //   { $set: data },
//   //   {
//   //     runValidators: true,
//   //   }
//   // );
// };
