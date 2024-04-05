// models/Service.ts
import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  list: { type: Array, required: true },
});

const Service = mongoose.models.Service || model("Service", ServiceSchema);

export default Service;
