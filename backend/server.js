const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
dotenv.config();
const PORT = 5000;

mongoose.connect(
    process.env.DB_CONTEXT,
    {  }, //useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
    (err) => {
        if (err) throw err;
        console.log("Connected to the mongodb");
    }
);

app.use(express.json());
app.use(cors());

const StudentsRoute = require("./routes/Students/StudentsRoute");

app.use("/api/student", StudentsRoute);

app.listen(PORT, () => {
    console.log("Server is up and running on server on " + PORT);
});
