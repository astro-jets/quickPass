// models/Subscription.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const SubscriptionSchema = new Schema(
  {
    user: {
      type: String,
    },
    service: {
      type: String,
    },
  },
  { timestamps: true }
);

const Subscription =
  mongoose.models.Subscription || model("Subscription", SubscriptionSchema);

export default Subscription;
