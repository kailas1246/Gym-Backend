import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

// Get all members
router.get("/", async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

// Add a member
router.post("/", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json(member);
});

// Delete a member

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a member
router.put("/:id", async (req, res) => {
  const updated = await Member.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;
