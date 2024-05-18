const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/api/v1/", router);
app.listen(port, () => console.log(`server is running on port ${port}`));