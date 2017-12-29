var express = require('express');
var router = express.Router();
var path = require('path');

//Majne modžuls
var config = require('../config');
var kon = config.getDBconnection();

/*select
	art_show_gr.naziv,
	articles.name,
	articles.id
from 
	articles, art_show_gr
where 
	articles.prikaz_group_id = art_show_gr.id 
order by 
    art_show_gr.naziv, articles.name;*/


/*select  
	art_show_gr.naziv,
	articles.name,
	articles.id
from 
	articles, art_show_gr
where 
articles.prikaz_group_id = art_show_gr.id
union all
select  
	naziv,
	null as name,
	null as id
from 
	art_show_gr
order by 
naziv, name;*/
router.get('/artikli', function(req, res, next){
    kon.query(`select
	art_show_gr.naziv,
	articles.name,
	articles.id
from 
	articles, art_show_gr
where 
	articles.prikaz_group_id = art_show_gr.id 
order by 
    art_show_gr.naziv, articles.name`,
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
router.get('/grupeartikala', function(req, res, next){
    kon.query(`SELECT * FROM ugo.art_show_gr`,
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
router.get('/dobavljaci', function(req, res, next){
    kon.query('SELECT * from suppliers',
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

router.post('/inventura', function(req, res, next){
    console.log(req.body);
    return res.status(201).json({
        message : 'Inventura spremljena',
        obj : req.body.content
    });
});

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