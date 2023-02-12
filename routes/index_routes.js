const express = require("express");
const router = express.Router();
const multipartConnect = require('connect-multiparty');
const multipart = multipartConnect();
const csvController = require("../controllers/csv_controllers");



router.get("/", csvController.home);
router.get('/display/:fileName',csvController.getCSVByName);
router.post("/upload", multipart, csvController.uploadCSV);

module.exports = router;
