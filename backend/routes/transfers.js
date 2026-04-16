const router = require("express").Router();
const Asset = require("../models/Asset");
const Transfer = require("../models/Transfer");
const auth = require("../middleware/auth");

router.post("/", auth(["Admin"]), async (req, res) => {
    const { assetName, quantity, fromBase, toBase } = req.body;

    const from = await Asset.findOne({ assetName, base: fromBase });

    if (!from || from.quantity < quantity) {
        return res.json("Not enough stock");
    }
    await Transfer.create(req.body);
    from.quantity -= Number(quantity);
    await from.save();
    let to = await Asset.findOne({ assetName, base: toBase });

    if (to) {
        to.quantity += Number(quantity);
        await to.save();
    } else {
        await Asset.create({
            assetName,
            type: from.type,
            quantity,
            base: toBase
        });
    }

    res.json("Transfer successful");
});

module.exports = router;