var express = require('express');
var router = express.Router();
var path = require('path');
const testFolder = './dist/assets/img/articles/';
const fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, testFolder)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({storage: storage}).single('photo');

var config = require('../../config');
var kon = config.getDBconnection();

// api/slike
router.get('/', function(req, res) {
    var data = []
    fs.readdirSync(testFolder).forEach(file => {
        data.push(file);
      });
      res.status(200).json({
        message: 'Success',
        obj: data
    });
});
router.post('/', function (req, res, next) {
    var path = '';
    //req.file.path = testFolder + req.file.originalname;
    upload(req, res, function (err) {
       if (err) {
         // An error occurred when uploading
         console.log(err);
         return res.status(422).send("an Error occured")
       }  
      // No error occured.
       path = req.file.path;
       console.log(req.file);
       return res.send("Upload Completed for "+path); 
 });     
})

module.exports = router;