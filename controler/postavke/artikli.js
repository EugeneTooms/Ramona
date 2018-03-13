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
    kon.query('SELECT * from location_articles WHERE location_id = ' + req.params.id.toString(),
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
router.post('/byLocation/', function(req, res) {
    var data = [];
    var jsondata = req.body;
    for (let i=0;i<jsondata.length; i++){
        data.push([
            jsondata[i].id,
            jsondata[i].location_id,
            jsondata[i].index]);
    }
    console.log(data[0]);
    kon.query('INSERT INTO location_articles VALUES ? ON DUPLICATE KEY UPDATE indeks=VALUES(indeks)' , [data],
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
router.get('/byLocation/', function(req, res) {
    kon.query('SELECT * from location_articles',
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