const express = require("express");
const app = express();
const path = require("path");
const db = require('./configs/mongoose');
const routes = require("./routes/index_routes");

// set view engine to ejs
app.set("view engine", "ejs");
// set views directory
app.set("views", path.join(__dirname, "views"));
// set assets directory as static
app.use(express.static("assets"));

// use ejs as rendering engine
app.engine("ejs", require("ejs").renderFile);
// use url-encoded middleware for encoding data in the body
app.use(express.urlencoded({ extended: true }));

// use routes for handling requests
app.use("/", routes);

// get port number from environment variable or set it to 8001
const portNo = process.env.PORT || 8001;

// start the server and listen on specified port number
app.listen(portNo, function (err) {
    if (err) {
        console.log(`Error while running server: ${err}`);
        return;
    }
    console.log(`Server is running at port Number: ${portNo}`);
});