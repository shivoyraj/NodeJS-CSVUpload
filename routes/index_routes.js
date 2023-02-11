const express = require("express");
const router = express.Router();
const multipartConnect = require('connect-multiparty');
const multipart = multipartConnect();
const csvController = require("../controllers/csv_controllers");



router.get("/", csvController.home);
router.post("/upload", multipart, csvController.uploadCSV);

//router.get("/search", csvController.searchCSV);
//router.get("/display/:filename", csvController.displayCSV);

module.exports = router;
