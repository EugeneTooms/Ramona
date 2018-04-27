var express = require('express');
var router = express.Router();
var path = require('path');

var config = require('../../config');
var kon = config.getDBconnection();
// api/analitika
router.get('/stanje', function(req, res) {
    /*
    select 
	article_id,
	articles.name, 
	art_show_gr.naziv as grupa,

    sum(prije) as prije,
    sum(ulazi) as ulazi,
    sum(prodaja) as prodaja,
    sum(otpisi) as otpisi,
    sum(poslije) as poslije
from
(
	(select 
		articles.id as article_id, 
		sum(case when bot_inventura_master.inventory_id = ?prvi-id then kolicina else 0 end) as prije,
		0 as ulazi,
		0 as prodaja,
		0 as otpisi,
		sum(case when bot_inventura_master.inventory_id = ?drugi-id then kolicina else 0 end) as poslije
		from 
			articles
		LEFT JOIN 
			bot_inventura_detail on articles.id = bot_inventura_detail.article_id
		LEFT JOIN 
			bot_inventura_master on bot_inventura_detail.location_id = bot_inventura_master.location_id and
			bot_inventura_detail.inventory_id = bot_inventura_master.inventory_id
		where 
			bot_inventura_master.inventory_id >= ?prvi-id
		group by
			articles.id
	)
	union all
	(select 
		receiving_items.article_id,
		0 as prije,
		sum(cast(receiving_items.amount as DECIMAL(12,4))) as ulazi,
		0 as prodaja,
		0 as otpisi,
		0 as poslije
	from 
		receivings
		left join receiving_items
	on 
		receivings.id = receiving_items.receiving_id 
	where 
		receivings.posted = 1  
		and receivings.document_date > ?drugi-datum(manji) and receivings.document_date < ?prvi-datum(veci)
	group by
    receiving_items.article_id
) 
union all
(select 
    product_items.article_id,
    0 as prije,
    0 as ulazi,
    sum(cast(sale_items.amount * product_items.amount as DECIMAL(12,4))) * -1 as prodaja,
    0 as otpisi,
    0 as poslije
from 
sales 
left join sale_items on sales.id = sale_items.sale_id 
left join products on products.id = sale_items.product_id
left join product_items on products.id = product_items.product_id 
group by
    product_items.article_id
)
) as xyz
LEFT JOIN articles on xyz.article_id = articles.id 
LEFT JOIN art_show_gr on articles.prikaz_group_id = art_show_gr.id 
group by 
xyz.article_id,
articles.name, 
art_show_gr.naziv;


    */

    /*
        select 
	articles.id, 
	articles.name, 
    art_show_gr.naziv as grupa,
	sum(case when bot_inventura_master.inventory_id = ? then kolicina else 0 end) as prije,
    sum(case when bot_inventura_master.inventory_id = ? then kolicina else 0 end) as poslije,
    sum(case when (receivings.document_date > ? and receivings.document_date < ? ) then  cast(receiving_items.amount as DECIMAL(12,4)) else 0 end) as ulazi
    from articles
    LEFT JOIN bot_inventura_detail on articles.id = bot_inventura_detail.article_id
    LEFT JOIN art_show_gr on art_show_gr.id = articles.prikaz_group_id
    LEFT JOIN bot_inventura_master on
        bot_inventura_detail.location_id = bot_inventura_master.location_id AND
        bot_inventura_detail.inventory_id = bot_inventura_master.inventory_id
    left join receiving_items on articles.id = receiving_items.article_id
    left join receivings on receiving_items.receiving_id = receivings.id  
    WHERE 
    receivings.posted = 1  and
    bot_inventura_master.inventory_id >= ? - ?
    group by 
        articles.id, 
        articles.name, 
        art_show_gr.naziv 
    */
    kon.query(`
    select 
	article_id,
	articles.name, 
	art_show_gr.naziv as grupa,

    sum(prije) as prije,
    sum(ulazi) as ulazi,
    sum(prodaja) as prodaja,
    sum(otpisi) as otpisi,
    sum(poslije) as poslije
    from
    (
	(select 
		articles.id as article_id, 
		sum(case when bot_inventura_master.inventory_id = ? then kolicina else 0 end) as prije,
		0 as ulazi,
		0 as prodaja,
		0 as otpisi,
		sum(case when bot_inventura_master.inventory_id = ? then kolicina else 0 end) as poslije
		from 
			articles
		LEFT JOIN 
			bot_inventura_detail on articles.id = bot_inventura_detail.article_id
		LEFT JOIN 
			bot_inventura_master on bot_inventura_detail.location_id = bot_inventura_master.location_id and
			bot_inventura_detail.inventory_id = bot_inventura_master.inventory_id
		where 
			bot_inventura_master.inventory_id >= ?
		group by
			articles.id
	)
	union all
	(select 
		receiving_items.article_id,
		0 as prije,
		sum(cast(receiving_items.amount as DECIMAL(12,4))) as ulazi,
		0 as prodaja,
		0 as otpisi,
		0 as poslije
	from 
		receivings
		left join receiving_items
	on 
		receivings.id = receiving_items.receiving_id 
	where 
		receivings.posted = 1  
		and receivings.document_date > ? and receivings.document_date < ?
	group by
    receiving_items.article_id
    ) 
    union all
    (select 
        product_items.article_id,
        0 as prije,
        0 as ulazi,
        sum(cast(sale_items.amount * product_items.amount as DECIMAL(12,4))) * -1 as prodaja,
        0 as otpisi,
        0 as poslije
    from 
    sales 
    left join sale_items on sales.id = sale_items.sale_id 
    left join products on products.id = sale_items.product_id
    left join product_items on products.id = product_items.product_id 
    group by
        product_items.article_id
    )
    ) as xyz
    LEFT JOIN articles on xyz.article_id = articles.id 
    LEFT JOIN art_show_gr on articles.prikaz_group_id = art_show_gr.id 
    where xyz.article_id IS NOT NULL
group by 
xyz.article_id,
articles.name, 
art_show_gr.naziv;

    `,[req.query.id2, req.query.id1,, req.query.id2, req.query.datum2, req.query.datum1], 
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
); console.log(req.query);
});
router.get('/inventorydates', function(req, res) { //jedinstveni Datumi inventure 
    kon.query('Select distinct snapshot_dttm, inventory_id from bot_inventura_master',
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