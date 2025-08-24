import mongoose from "mongoose";
import cron from "node-cron";

const childDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    commlevel: { type: String },
    lang: { type: String },
    commaids: [{ type: String }],
    instructionstep: [{ type: String }],
    emotions: [{ type: String }],
    interests: [{ type: String }],
    hypersensitive: [{ type: String }],
    hypersensitivities: [{ type: String }],
    hyposensitivities: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }
  },
  { timestamps: true }
);

const ChildData = mongoose.model("ChildData", childDataSchema);

// Health check function
function healthCheck() {
  console.log("Health check at", new Date().toISOString());
 
}


cron.schedule("*/14 * * * *", healthCheck);

export default ChildData;
