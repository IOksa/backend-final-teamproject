const { Review } = require("../../models/review");
const { HttpError, ctrlWrapper } = require("../../helpers");

async function getAll(req, res) {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const reviewsAll = await Review.find({}, {}, { skip, limit });

  res.status(200).json(reviewsAll);
}

async function getOwnReview(req, res) {
  const { _id: owner } = req.user;

  const ownReview = await Review.find({ owner });
  if (!ownReview) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(ownReview);
}

async function addReview(req, res) {
  const { _id: owner, name, avatarURL } = req.user;
  const ownReview = await Review.find({ owner });
  if (ownReview && ownReview.length !== 0) {
    throw HttpError(409, "Conflict");
  }

  const newReview = await Review.create({
    ...req.body,
    owner,
    name,
    avatarURL,
  });

  res.status(201).json(newReview);
}

async function updateReview(req, res) {
  const { _id: owner, avatarURL } = req.user;

  const updatedReview = await Review.findOneAndUpdate(
    { owner },
    { ...req.body, avatarURL },
    {
      new: true,
    }
  );
  if (!updatedReview) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(updatedReview);
}

async function deleteReview(req, res) {
  const { _id: owner } = req.user;

  const ownReview = await Review.findOneAndDelete({ owner });
  if (!ownReview) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "review deleted" });
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  addReview: ctrlWrapper(addReview),
  getOwnReview: ctrlWrapper(getOwnReview),
  deleteReview: ctrlWrapper(deleteReview),
  updateReview: ctrlWrapper(updateReview),
};
