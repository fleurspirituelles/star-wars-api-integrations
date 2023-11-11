const express = require("express");
const mainRouter = require("./routes/mainRouter");
//const cors = require("cors");
const app = express();

app.use(express.json());
//app.use(cors());
app.use("/api", mainRouter);

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});