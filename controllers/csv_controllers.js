const CSVToJSON = require('csvtojson');
const CSV = require('../models/csv');

// Declare error and success message variables
let errorMsg = "";
let successMsg = ""; 

// Controller function for retrieving a CSV file by its name
exports.getCSVByName = async function (req, res) {
  try {
    // Retrieve the file data from the database
    const fileData = await CSV.findOne({ filename: req.params.fileName });
    console.log(fileData)

    // Render the "display_csv" template and pass the file data to it
    return res.render('display_csv', {
      data: fileData.data,
      fileName : fileData.filename.split('.')[0]
    });
  } catch (error) {
    // Log any errors that occurred while retrieving the CSV data
    console.error("Error occured while CSV data : ", error);
  }
}

// Controller function for uploading a new CSV file
exports.uploadCSV = async function (req, res) {

  // Retrieve the uploaded file information
  const file = req.files.csvFile;
  const pathOfFile = file.path;
  const nameOfFile = file.name;

  try {
    // Convert the CSV file to JSON
    const dataOfFile = await CSVToJSON().fromFile(pathOfFile);

    // Save the CSV file data to the database
    const csvFileUploaded = await CSV.create({
      filename: nameOfFile,
      data: dataOfFile
    });

    // Log the successful upload of the CSV file
    console.log('CSV file uploaded successfully' + csvFileUploaded)
    errorMsg = ""
    successMsg = "CSV file uploaded successfully"
  } catch (err) {
    // Handle any errors that occurred while uploading the CSV file
    successMsg = ""
    errorMsg = "Invalid CSV File"
  }

  // Retrieve the list of filenames from the database
  const allFilenames = await CSV.find({}, { filename: 1 });

  // Render the "index" template and pass the file names and error/success messages to it
  return res.render('index.ejs', {
    fileNames: allFilenames,
    errorMessage : errorMsg,
    successMessage : successMsg
  });
}

// Controller function for displaying the home page
exports.home = async function (req, res) {
  // Retrieve the list of filenames from the database
  const allFilenames = await CSV.find({}, { filename: 1 });

  // Render the "index" template and pass the file names to it
  return res.render('index.ejs', {
    fileNames: allFilenames,
    errorMessage : "",
    successMessage : ""
  });
}
