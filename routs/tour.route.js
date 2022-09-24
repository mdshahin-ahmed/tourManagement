const express = require("express");
const router = express.Router();
const tourControler = require("../controlars/tour.controlar");

router
  .route("/tours")
  .get(tourControler.getTours)
  .post(tourControler.createTour);
router.route("/tour/cheapest").get(tourControler.chepestTours);

router.route("/tour/trending").get(tourControler.trendingTours);

router.route("/tour/:id").patch(tourControler.updateTourById);

router.route("/tours/:id").get(tourControler.getToursById);
// .patch(tourControler.updateViewCount);

module.exports = router;
