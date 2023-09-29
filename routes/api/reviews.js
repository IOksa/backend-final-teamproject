const express = require("express");
const { reviewValidateSchema } = require("../../models/review");

const { validateBody, authenticate } = require("../../middlewares");

const reviewsRouter = express.Router();

const ctrl = require("../../controllers/reviews");

reviewsRouter.get("/", ctrl.getAll);

reviewsRouter.get("/own", authenticate, ctrl.getOwnReview);

reviewsRouter.post(
  "/own",
  authenticate,
  validateBody(reviewValidateSchema),
  ctrl.addReview
);

reviewsRouter.patch(
  "/own",
  authenticate,
  validateBody(reviewValidateSchema),
  ctrl.updateReview
);

reviewsRouter.delete("/own", authenticate, ctrl.deleteReview);

module.exports = reviewsRouter;
