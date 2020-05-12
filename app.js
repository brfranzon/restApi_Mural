// package import
const express = require("express");
// express constructor run
const app = express();
// package DB import
const db = require("mongoose");
const bodyParser = require("body-parser");



// Routes
const postRoutes = require("./routes/api");
// Middlewares: function that are executed when routes are executed!
app.use(bodyParser.json());
app.use("/api/", postRoutes);

// call static documents: my html
const path = require("path");
app.use("/", express.static(path.join(__dirname, "public")));



// connect to DB
let db_mongoose = "mongodb://brfranzon:#Domine1227@cluster0-shard-00-00-c5jti.mongodb.net:27017,cluster0-shard-00-01-c5jti.mongodb.net:27017,cluster0-shard-00-02-c5jti.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

db.connect(process.env.MONGODB_URI || db_mongoose,
    { useNewUrlParser: true }, () => {
    console.log("DB Connected...")
})

const PORT = process.env.PORT;

// Listening to the Server...
app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`);
})