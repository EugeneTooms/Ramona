var express = require('express');
var router = express.Router();
var path = require('path');

var config = require('../../config');
var kon = config.getDBconnection();
// api/lokacije

//GETS
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
router.get('/byLocation/:id', function(req, res) {
    kon.query('SELECT * from location_articles WHERE location_id = ' + req.params.id.toString() + ' ORDER BY indeks',
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

//POSTS
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
//UPDATES
router.patch('/:id', function(req, res) {
    var data = [];
    var jsondata = req.body;
    console.log(jsondata);
    kon.query('UPDATE articles SET barcode = ?, name = ?,  unit = ?, price_sell = ?, price_buy = ?, feedback_compensation = ?, dozvoljeni_kalo= ?, img = ? WHERE id = ?',
     [  jsondata.barcode, jsondata.naziv, jsondata.jedinica , jsondata.prodajnaCijena, jsondata.nabavnaCijena,
         jsondata.naknada, jsondata.kalo , jsondata.img, 
         req.params.id],
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