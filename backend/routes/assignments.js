const router = require("express").Router();
const Asset = require("../models/Asset");
const Assignment = require("../models/assignment");
const auth = require("../middleware/auth");

router.get("/", auth(["Admin", "Commander"]), async (req, res) => {
    try {
        const data = await Assignment.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching assignments" });
    }
});

router.post("/", auth(["Admin", "Commander"]), async (req, res) => {
    try {
        const { assetName, quantity, base, assignedTo } = req.body;

        const assignQty = Number(quantity);
        const asset = await Asset.findOne({ assetName, base });

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }
        const result = await Assignment.aggregate([
            {
                $match: { assetName, base }
            },
            {
                $group: {
                    _id: null,
                    totalAssigned: { $sum: "$quantity" }
                }
            }
        ]);

        const alreadyAssigned = result.length > 0 ? result[0].totalAssigned : 0;
        const remaining = asset.quantity - alreadyAssigned;
        if (assignQty > remaining) {
            return res.status(400).json({
                message: `Only ${remaining} units available in ${base}`
            });
        }
        const newAssignment = await Assignment.create({
            assetName,
            quantity: assignQty,
            base,
            assignedTo
        });

        res.status(201).json({
            message: "Assigned successfully",
            data: newAssignment
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;