import express from "express";
import ChildData from "../models/Childata.js"; // adjust path if needed

const router = express.Router();

// ✅ Create child data
router.post("/", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      commlevel,
      lang,
      commaids,
      instructionstep,
      emotions,
      hypersensitive,
      hypersensitivities,
      hyposensitivities,
      user // optional if schema is updated
    } = req.body;

    // Validate required fields
    if (!name || !age || !gender) {
      return res
        .status(400)
        .json({ error: "Name, age, and gender are required fields." });
    }

    // Create new child record
    const childData = new ChildData({
      name,
      age,
      gender,
      commlevel,
      lang,
      commaids,
      instructionstep,
      emotions,
      hypersensitive,
      hypersensitivities,
      hyposensitivities,
      user // send in body OR remove if optional
    });

    await childData.save();
    res.status(201).json(childData);
  } catch (error) {
    console.error("Error saving child data:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ✅ Get all child data
router.get("/", async (req, res) => {
  try {
    const childData = await ChildData.find().populate("user"); // will show user details if available
    res.json(childData);
  } catch (error) {
    console.error("Error fetching child data:", error.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
