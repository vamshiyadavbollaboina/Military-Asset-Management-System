const router = require("express").Router();
const Asset = require("../models/Asset");
const Purchase = require("../models/purchase");
const auth = require("../middleware/auth");

router.post("/", auth(["Admin", "Logistics"]), async (req, res) => {
    const { assetName, type, quantity, base } = req.body
    await Purchase.create(req.body)
    let asset = await Asset.findOne({ assetName, base });
    if (asset) {
        asset.quantity += Number(quantity);
        await asset.save();
    } else {
        await Asset.create({ assetName, type, quantity, base });
    }

    res.json("Purchase added");
});

router.get("/", async (req, res) => {
    const data = await Asset.find();
    res.json(data);
});

module.exports = router;