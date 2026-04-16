require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/purchases", require("./routes/purchases"));
app.use("/api/transfers", require("./routes/transfers"));
app.use("/api/assignments", require("./routes/assignments"));

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});