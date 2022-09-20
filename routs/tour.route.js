const express = require("express");
const router = express.Router();
const tourControler = require("../controlars/tour.controlar");

router
  .route("/tours")
  .get(tourControler.getTours)
  .post(tourControler.createTour);
router.route("/tour/cheapest").get(tourControler.chepestTours);

router.route("/tour/:id").patch(tourControler.updateTourById);

// // dynamic last
// router
//   .route("/:id")
//   .patch(productControler.updateProductById)
//   .delete(productControler.deleteProductById);

module.exports = router;
