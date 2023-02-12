const CSVToJSON = require('csvtojson');
const CSV = require('../models/csv');

exports.getCSVByName = async function (req, res) {
  try {
    const fileData = await CSV.findOne({ filename: req.params.fileName });
    console.log(fileData)
    return res.render('display_csv', {
      data: fileData.data,
      fileName : fileData.filename.split('.')[0]
    });
  } catch (error) {
    console.error("Error occuered while CSV data : ", error);
  }
}

exports.uploadCSV = async function (req, res) {

  const file = req.files.csvFile;
  const pathOfFile = file.path;
  const nameOfFile = file.name;

  const dataOfFile = await CSVToJSON().fromFile(pathOfFile);
  try {
    const csvFileUploaded = await CSV.create({
      filename: nameOfFile,
      data: dataOfFile
    });
    console.log('CSV file uploaded successfully' + csvFileUploaded)
  } catch (err) {
    console.log("Error while posting csv file : " + err)
  }

  return res.redirect('back');
}

exports.home = async function (req, res) {
  const allFilenames = await CSV.find({}, { filename: 1 });
  return res.render('index.ejs', {
    fileNames: allFilenames
  });
}
