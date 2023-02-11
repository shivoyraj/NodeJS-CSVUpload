const CSVToJSON = require('csvtojson');
const CSV = require('../models/csv');

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

exports.home = ((req, res) => {
  return res.render('index.ejs');
})
