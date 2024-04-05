// models/Notification.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const NotificationSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    description: { type: String },
    status: { type: String, default: "unread" },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification || model("Notification", NotificationSchema);

export default Notification;
