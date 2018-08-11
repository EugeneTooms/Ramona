var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment-timezone');

//Majne modžuls
var config = require('../config');
var kon = config.getDBconnection();
var mejler = require('./mejler');
/* GET FUNKCIJE */
router.get('/artikliZaOrder', function(req, res, next){
    var artikli
    kon.query(`
    SELECT id, name, amount, img_src, supplier_id, dozvoljeni_kalo FROM ugo.articles left join bot_articles_details on bot_articles_details.article_id = articles.id
    `,function(error, results){
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
    });
    // kon.query(`
    // SELECT id, name, amount, img_src, supplier_id FROM ugo.articles left join bot_articles_details on bot_articles_details.article_id = articles.id
    // `,
    //     function(error, results){
    //             if(error) {
    //                 return res.status(500).json({
    //                     title: 'An error has occured',
    //                     error : error
    //                 });
    //             }
    //             artikli = results;
    
    //             for (let i=0;i<artikli.length; i++){
    //                 kon.query(`
    //                 select id, naziv from bot_zapremnina left join 
    //                 bot_zapremnina_articles on bot_zapremnina_articles.zapremnina_id = bot_zapremnina.id where article_id = ` + artikli[i].id,
    //                 function(error, results){
    //                         if(error) {
    //                             return res.status(500).json({
    //                                 title: 'An error has occured',
    //                                 error : error
    //                             });
    //                         }		
    //                         artikli[i].zapremnine = results;
    //                 }
    //                 );	
    //             }
    //             for (let i=0;i<artikli.length; i++){
    //                 kon.query(`
    //                 select id, naziv from bot_paketi left join 
    //                 bot_paketi_articles on paketi_id = bot_paketi.id where article_id = ` + artikli[i].id,
    //                 function(error, results){
    //                         if(error) {
    //                             return res.status(500).json({
    //                                 title: 'An error has occured',
    //                                 error : error
    //                             });
    //                         }		
    //                         artikli[i].paketi = results;	
    //                         if(i == (artikli.length-1)){
    //                             res.status(201).json({
    //                                 message: 'Success',
    //                                 obj: artikli
    //                             });
    //                         }
    //                 }
    //                 );	
    //             }

    //     }
    // );
});
router.get('/orders', function(req, res, next){
    var orders;
    kon.query(`
    SELECT bot_orders.id, suppliers.name, bot_orders.date FROM bot_orders LEFT JOIN suppliers on suppliers.id = bot_orders.supplier_id
    where bot_orders.canceled is null`,
        function(error, results){
                if(error) {
                    return res.status(500).json({
                        title: 'An error has occured',
                        error : error
                    });
                }	
                orders = results;
                if(results.length == 0){
                    res.status(201).json({
                        message: 'Sucess',
                        obj: orders
                    });
                }else{	
                    for (let i=0;i<orders.length; i++){
                        kon.query(`
                    SELECT order_id, 
                    bot_orders_articles.article_id,
                    article_name,
                    img_src, 
                    kalo,
                    boce_kol,
                    paketi_kol
                    from bot_orders_articles  left join bot_articles_details on bot_articles_details.article_id = bot_orders_articles.article_id
                    where order_id = ` + orders[i].id,
                    function(error, results){
                            if(error) {
                                return res.status(500).json({
                                    title: 'An error has occured',
                                    error : error
                                });
                            }
                            orders[i].artikli = results;
                            if(i == (orders.length-1) ){
                                res.status(200).json({
                                    message: 'Sucess',
                                    obj: orders
                                });
                            }
                        });
                    }
                // for (let i=0;i<orders.length; i++){
                //     kon.query(`
                //     select *,naziv as zapremnine_naziv from bot_orders_articles  
                //     left join bot_zapremnina on bot_zapremnina.id = bot_orders_articles.zapremnine_id where order_id = ` + orders[i].id,
                //     function(error, results){
                //             if(error) {
                //                 return res.status(500).json({
                //                     title: 'An error has occured',
                //                     error : error
                //                 });
                //             }		
                //             orders[i].artikli = results;
                //             for (let j=0;j<orders[i].artikli.length; j++){
                //                 kon.query(`
                //                 select id, naziv from bot_zapremnina left join 
                //                 bot_zapremnina_articles on bot_zapremnina_articles.zapremnina_id = bot_zapremnina.id where article_id = `
                //                 + orders[i].artikli[j].article_id,
                //                 function(error, results){
                //                         if(error) {
                //                             return res.status(500).json({
                //                                 title: 'An error has occured',
                //                                 error : error
                //                             });
                //                         }		
                //                         orders[i].artikli[j].zapremnine = results;
                //                         if((j == (orders[i].artikli.length-1)) && (i == (orders.length-1)) ){
                                            
                //                             res.status(201).json({
                //                                 message: 'Sucess',
                //                                 obj: orders
                //                             });
                                            
                //                         }
                //                 }
                //                 );	
                //             }	
                //     }
                //     );	
                // }
        }
    }
    );
});
// router.get('/orderitems', function(req, res, next){
//     kon.query(`
//     SELECT * FROM receiving_order_items
//     `,
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
router.post('/orders', function(req, res, next){
    var details = [];
    var master = [];
    var suppliers = [];
    
    var jsonorders = req.body;
    var datum = moment(req.body.datum).format('YYYY-MM-DD HH:mm:ss');
    for(let i = 0; i < jsonorders.length; i++) {
        if(!suppliers.includes(jsonorders[i].supplier_id)) {
            suppliers.push(jsonorders[i].supplier_id);
        }
    }
    for (let i=0;i<suppliers.length; i++){
        master.push(
            {'supplier' : suppliers[i],
            'date' : datum}
            );
    }
    for (let i=0;i<master.length; i++){
        kon.query(`INSERT INTO bot_orders (supplier_id, date) VALUES (` + master[i].supplier +`,'`+ master[i].date+`')`,
        function(error, results){
                if(error) {
                    return res.status(500).json({
                        title: 'An error has occured',
                        error : error
                    });
                    }
                    for (let j=0;j<jsonorders.length; j++){
                        if( master[i].supplier === jsonorders[j].supplier_id ){
                            kon.query('INSERT INTO bot_orders_articles VALUES (' +
                                results.insertId+ ','+
                                jsonorders[j].id + ','+
                                jsonorders[j].kalo+ ','+
                                jsonorders[j].boce+ ','+
                                jsonorders[j].boxes+ ')',
                                function(error, rezultati){
                                        if(error) {
                                            return res.status(500).json({
                                                title: 'An error has occured',
                                                error : error
                                            });
                                        }
                                        mejler.SendMail(results.insertId);			
                                }
                            )
                        }
                    }
                    
                    if(i == (master.length-1)){
                        res.status(201).json({
                            message: 'Narudzbe poslane',
                            obj: results
                        })
                    }
            }
        );
    }
});
router.post('/primka', function(req, res, next){
    var details = [];   
    var jsonprimka = req.body;
    var datum = moment(req.body.datum).format('YYYY-MM-DD HH:mm:ss');
        kon.query(`INSERT INTO receivings (number, created) VALUES (` + kon.escape(jsonprimka.number) +`, `+ kon.escape(datum)+`)`,
         function (error, results) {
            if (error) {
                return res.status(500).json({
                    title: 'An error has occured',
                    error : error
                });
            }
            for (let i=0;i<jsonprimka.artikli.length; i++){
                details.push([
                    results.insertId,
                    jsonprimka.artikli[i].article_id,
                    (jsonprimka.artikli[i].kalo*jsonprimka.artikli[i].paketi_kol)
                ]);
                if (i==(jsonprimka.artikli.length-1)){
                    kon.query(`INSERT INTO receiving_items (receiving_id, article_id, amount) VALUES ?`,[details],
                    function (error, results) {
                       if (error) {
                           return res.status(500).json({
                               title: 'An error has occured',
                               error : error
                           });
                       }
                       kon.query(`UPDATE bot_orders SET canceled = ? WHERE id = ?`, [1,jsonprimka.id],
                       function (error, results) {
                          if (error) {
                              return res.status(500).json({
                                  title: 'An error has occured',
                                  error : error
                              });
                          }
                         
                          res.status(200).json({
                              message: 'Primka zapisana'
                          });
                       });
                    });
                }
            }
        });
});
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