const express = require("express");
const router = express.Router();
const multipartConnect = require('connect-multiparty');
const multipart = multipartConnect();
const csvController = require("../controllers/csv_controllers");

// GET request to root route "/"
router.get("/", csvController.home);

// GET request to display a specific file by name "/display/:fileName"
router.get('/display/:fileName',csvController.getCSVByName);

// POST request to upload a CSV file
router.post("/upload", multipart, csvController.uploadCSV);

module.exports = router;