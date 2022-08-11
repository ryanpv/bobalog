const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env"})
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use(require("./routes/products.js"));

const dbo = require("./db/conn.js")

app.listen(port, () => {
    dbo.connectToServer(function (err) {
        if (err) console.log(err);

    });
    console.log(`Server connected to port: ${port}`);
})

/////////////////////////////////////////////////////////////////////////////////////////

