var express = require('express');
var router = express.Router();
var path = require('path');

//Majne modžuls
var config = require('../config');
var kon = config.getDBconnection();


// router.get('/articles', function(req, res, next){
//     kon.query('SELECT * from articles',
//         function(error, results){
//                 if(error) {
//                     return res.status(500).json({
//                         title: 'An error has occured',
//                         error : error
//                     });
//                 }			
//                 res.status(200).json({
//                     message: 'Success',
//                     obj: results
//                 });
//         }
//     );
// });
// router.get('/receivingitems/:id', function(req, res, next){
    
//     kon.query('SELECT * from receiving_items WHERE receiving_id = ' + req.params.id,
//         function(error, results){
//                 if(error) {
//                     return res.status(500).json({
//                         title: 'An error has occured',
//                         error : error
//                     });
//                 }			
//                 res.status(200).json({
//                     message: 'Success',
//                     obj: results
//                 });
//         }
//     );
// });
// router.get('/receivings_list', function(req, res, next){
    
//     kon.query('SELECT * from receivings',
//         function(error, results){
//                 if(error) {
//                     return res.status(500).json({
//                         title: 'An error has occured',
//                         error : error
//                     });
//                 }			
//                 res.status(200).json({
//                     message: 'Success',
//                     obj: results
//                 });
//         }
//     );
// });

// router.post('/article', function(req, res, next){
//     console.log(req.body);
//     res.status(200).json({
//         message : 'Success',
//         obj : req.body.content
//     });
//     // kon.query('INSERT INTO articles SET ?', req.body,
//     //     function(error, results){
//     //             if(error) {
//     //                 return res.status(500).json({
//     //                     title: 'An error has occured',
//     //                     error : error
//     //                 });
//     //             }			
//     //             res.status(200).json({
//     //                 message: 'Success',
//     //                 obj: results
//     //             });
//     //     }
//     // );
// });

module.exports = router;