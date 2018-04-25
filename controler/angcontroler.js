var express = require('express');
var router = express.Router();
var path = require('path');

//Majne modžuls
var config = require('../config');
var kon = config.getDBconnection();

/*select
    articles.id
    articles.name,
	art_show_gr.naziv,
	bot_inventura_in_out.ulazi,
	bot_inventura_in_out.izlazi
from 
	articles, art_show_gr, bot_inventura_in_out
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
naziv, name;
bot_inventura_in_out

*/
router.use('/lokacije', require('./postavke/lokacije'));
router.use('/artikli', require('./postavke/artikli'));
router.use('/slike', require('./postavke/slike'));

router.get('/inventura/artikli', function(req, res, next){
    kon.query(`select
    articles.id,
    articles.name,
	art_show_gr.naziv as grupa,
    ROUND((bot_inventura_in_out.ulazi - bot_inventura_in_out.izlazi ), 2 ) as  postojece_stanje,
	ROUND(bot_inventura_in_out.ulazi, 2) as ulazi,
	ROUND(bot_inventura_in_out.izlazi, 2) as izlazi
from 
	articles, art_show_gr, bot_inventura_in_out
where 
	articles.prikaz_group_id = art_show_gr.id && articles.id = bot_inventura_in_out.article_id
order by 
    art_show_gr.naziv, articles.name;`,
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
router.get('/ionicinventura/:id', function(req, res, next){
    kon.query(`
            SELECT articles.id, bot_inventura_master.inventory_id, bot_location_articles.indeks, articles.name, articles.img, bot_inventura_detail.kolicina 
            FROM bot_inventura_detail 
            LEFT JOIN articles on bot_inventura_detail.article_id = articles.id
            LEFT JOIN bot_location_articles on 
            bot_inventura_detail.article_id = bot_location_articles.article_id  
            AND bot_inventura_detail.location_id = bot_location_articles.location_id
            LEFT JOIN bot_inventura_master on
            bot_inventura_detail.location_id = bot_inventura_master.location_id AND
            bot_inventura_detail.inventory_id = bot_inventura_master.inventory_id
            WHERE bot_inventura_master.inventory_id = ( SELECT  MAX(bot_inventura_master.inventory_id)
            FROM bot_inventura_master 
            WHERE  
            bot_inventura_master.location_id =  ?) AND  bot_inventura_master.location_id = ?
            ORDER BY indeks
            `,[req.params.id, req.params.id],
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
router.post('/ionicinventura', function(req, res, next){
    var artikli = [];
    var jsondata = req.body.artikli;

    kon.query('INSERT INTO bot_inventura_master SET ?', {inventory_id : req.body.inventory_id, location_id : req.body.lokacija.id, snapshot_dttm : req.body.datum},
    function(error, results){
            if(error) {
                return res.status(500).json({
                    title: 'An error has occured',
                    error : error
                });
            }
            for (let i=0;i<jsondata.length; i++){
                artikli.push([req.body.inventory_id,
                    req.body.lokacija.id,
                    jsondata[i].id,
                    jsondata[i].kolicina,
                ]);
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
router.get('/primke', function(req, res, next){
    kon.query('SELECT * from receivings',
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
    var data = [];
    var jsondata = req.body;
    for (let i=0;i<jsondata.length; i++){
        data.push([jsondata[i].datum,
            jsondata[i].id,
            jsondata[i].naziv,
            jsondata[i].grupa,
            jsondata[i].postojece_stanje,
            jsondata[i].doslo,
            jsondata[i].prodano,
            jsondata[i].novo_stanje,
            jsondata[i].stanje,
            jsondata[i].razlika]);
    }
    //console.log(data);

        kon.query('INSERT INTO inventory_post VALUES ?', [data],
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
});
module.exports = router;