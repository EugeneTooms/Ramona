var express = require('express');
var router = express.Router();
var path = require('path');

var config = require('../../config');
var kon = config.getDBconnection();
// api/lokacije
router.get('/', function(req, res) {
    kon.query('SELECT * from articles',
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
router.get('/byLocation/:id', function(req, res) {
    kon.query('SELECT * from articles WHERE location_id = ' + req.params.id.toString(),
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


module.exports = router;