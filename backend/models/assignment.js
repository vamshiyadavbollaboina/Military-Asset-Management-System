const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    assetName: String,
    quantity: Number,
    base: String,
    assignedTo: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Assignment", assignmentSchema);