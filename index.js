const express = require("express");
const app = express();
const path = require("path");
const db = require('./configs/mongoose');
const routes = require("./routes/index_routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));

app.engine("ejs", require("ejs").renderFile);
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const portNo = process.env.PORT || 8001;

app.listen(portNo, function(err){
    if(err){
        console.log(`Error while running server : ${err}`);
        return;
    }
    console.log(`Server is running at port Number: ${portNo}`);
});