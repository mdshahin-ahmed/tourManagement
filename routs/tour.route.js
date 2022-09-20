const express = require("express");
const router = express.Router();
const tourControler = require("../controlars/tour.controlar");

// // diffrent first
// router.route("/bulk-update").patch(productControler.bulkUpdateProduct);
// router.route("/bulk-delete").delete(productControler.bulkDeleteProduct);

// root middle
router.route("/").get(tourControler.getTours).post(tourControler.createTour);

// // dynamic last
// router
//   .route("/:id")
//   .patch(productControler.updateProductById)
//   .delete(productControler.deleteProductById);

module.exports = router;
