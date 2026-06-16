import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true , maxLength: 500},
  },
  { timestamps: true },
);

reviewSchema.index(
  { productId: 1, userId: 1 },
  { unique: true }
);

reviewSchema.index({ productId: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
