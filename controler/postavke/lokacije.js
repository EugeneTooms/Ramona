var express = require('express');
var router = express.Router();
var path = require('path');

var config = require('../../config');
var kon = config.getDBconnection();
// api/lokacije
router.get('/', function(req, res) {
    kon.query('SELECT * from bot_locations',
    function(error, results){
            if(error) {
                return res.status(500).json({
                    title: 'An error has occured',
                    error : error
                });
            }			
            res.status(200).json({
                message: 'Success',
                obj: results
            });
    }
);
});
router.post('/', function(req, res) {
    var jsondata = { id :  req.body.id , naziv_lokacije : req.body.naziv};
    kon.query('INSERT INTO bot_locations SET ?', jsondata ,
    function(error, results){
            if(error) {
                return res.status(500).json({
                    title: 'An error has occured',
                    error : error
                });
            }			
            res.status(201).json({
                message: 'Success',
                obj: results
            });
    }
);
});
module.exports = router;