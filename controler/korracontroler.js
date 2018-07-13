var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment-timezone');

//Majne modžuls
var config = require('../config');
var kon = config.getDBconnection();
/* GET FUNKCIJE */
router.get('/artikliZaOrder', function(req, res, next){
    var artikli
    kon.query(`
    SELECT * FROM articles
    `,
        function(error, results){
                if(error) {
                    return res.status(500).json({
                        title: 'An error has occured',
                        error : error
                    });
                }
                artikli = results;
    
                for (let i=0;i<artikli.length; i++){
                    kon.query(`
                    select id, naziv from bot_zapremnina left join 
                    bot_zapremnina_articles on zapremnina_id = bot_zapremnina.id where article_id = ` + artikli[i].id,
                    function(error, results){
                            if(error) {
                                return res.status(500).json({
                                    title: 'An error has occured',
                                    error : error
                                });
                            }		
                            artikli[i].zapremnine = results;
                    }
                    );	
                }
                for (let i=0;i<artikli.length; i++){
                    kon.query(`
                    select id, naziv from bot_paketi left join 
                    bot_paketi_articles on paketi_id = bot_paketi.id where article_id = ` + artikli[i].id,
                    function(error, results){
                            if(error) {
                                return res.status(500).json({
                                    title: 'An error has occured',
                                    error : error
                                });
                            }		
                            artikli[i].paketi = results;	
                            if(i == (artikli.length-1)){
                                res.status(201).json({
                                    message: 'Success',
                                    obj: artikli
                                });
                            }
                    }
                    );	
                }

        }
    );
});
router.get('/orders', function(req, res, next){
    var orders;
    kon.query(`
    SELECT * FROM bot_orders
    `,
        function(error, results){
                if(error) {
                    return res.status(500).json({
                        title: 'An error has occured',
                        error : error
                    });
                }	
                orders = results;		
                for (let i=0;i<orders.length; i++){
                    kon.query(`
                    select * from bot_orders_articles where order_id = ` + orders[i].id,
                    function(error, results){
                            if(error) {
                                return res.status(500).json({
                                    title: 'An error has occured',
                                    error : error
                                });
                            }		
                            orders[i].artikli = results;	
                            if(i == (orders.length-1)){
                                res.status(201).json({
                                    message: 'Sucess',
                                    obj: orders
                                });
                            }
                    }
                    );	
                }
        }
    );
});
router.get('/orderitems', function(req, res, next){
    kon.query(`
    SELECT * FROM receiving_order_items
    `,
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
router.get('/lokacije', function(req, res, next){
    kon.query(`
    SELECT * FROM bot_locations ORDER BY pozicija
    `,
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
router.get('/artikli', function(req, res, next){
    kon.query(`
    SELECT bot_location_articles.article_id, bot_location_articles.location_id, bot_location_articles.indeks, bot_inventura_detail.inventory_id, bot_inventura_detail.kolicina, bot_articles_details.article_name, bot_articles_details.img_src
    FROM bot_location_articles
    LEFT JOIN bot_inventura_detail ON (
    bot_inventura_detail.inventory_id = (SELECT  MAX(bot_inventura_detail.inventory_id) FROM bot_inventura_detail 
    WHERE bot_inventura_detail.location_id = bot_location_articles.location_id) &&
    bot_inventura_detail.article_id = bot_location_articles.article_id && 
    bot_inventura_detail.location_id = bot_location_articles.location_id)
    LEFT JOIN bot_articles_details ON bot_articles_details.article_id = bot_location_articles.article_id
    ORDER BY location_id, indeks
    `,
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
/* POST FUNKCIJE */
router.post('/ionicinventura', function(req, res, next){
    var artikli = [];
    var master = [];
    var lokacije = [];
    var jsonartikli = req.body.artikli;
    var datum = moment(req.body.datum).format('YYYY-MM-DD HH:mm:ss');
    for(var i = 0; i < jsonartikli.length; i++) {
        if(!lokacije.includes(jsonartikli[i].lokacija_id)) {
            lokacije.push(jsonartikli[i].lokacija_id);
        }
    }
    for (let i=0;i<lokacije.length; i++){
        master.push([jsonartikli[0].inventory_id+1,
            lokacije[i],
            datum
            ]);
    }   
    for (let i=0;i<jsonartikli.length; i++){
        artikli.push([jsonartikli[0].inventory_id+1,
            jsonartikli[i].lokacija_id,
            jsonartikli[i].id,
            jsonartikli[i].kolicina,
        ]);
    }
    kon.query('INSERT INTO bot_inventura_master VALUES ?', [master],
    function(error, results){
            if(error) {
                return res.status(500).json({
                    title: 'An error has occured',
                    error : error
                });
            }
            kon.query('INSERT INTO bot_inventura_detail VALUES ?', [artikli],
            function(error, results){
                    if(error) {
                        return res.status(500).json({
                            title: 'An error has occured',
                            error : error
                        });
                    }			
                    res.status(201).json({
                        message: 'Inventura spremljena',
                        obj: results
                    });
            }
            );		
        }
    );
});

module.exports = router;