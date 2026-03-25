import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    ratings: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false, // For now, allow products without a specific admin creator
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
