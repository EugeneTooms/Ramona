var nodemailer = require('nodemailer');

var config = require('../config');
var kon = config.getDBconnection();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ivica@botanicar.hr',
    pass: `Ramuscak2018`
  }
});

// var mailOptions = {
//   from: 'mladen.krneta@gmail.com',
//   to: 'marko.krneta@gmail.com',
//   subject: 'Sending Email using Node.js',
//   html: `
//   <h1>Welcome</h1>
//   That was easy!`
// };
// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   })

module.exports = {
    SendMail : function(id){
        let  tekst ='';
        kon.query(` SELECT name, email FROM ugo.bot_orders left join suppliers on suppliers.id = bot_orders.supplier_id where bot_orders.id = ` + id,
        function(error, primatelj){
                if(error) {
                    return error;
                }
                kon.query(`
                SELECT paketi_kol, qty, name FROM ugo.bot_orders_articles 
                left join articles on articles.id = bot_orders_articles.article_id
                where order_id = ` + id+';',
                function(error, narudzba){
                        if(error) {
                            return error;
                        } 
                        tekst =` <h1>Narudžba za Botaničar</h1><br>`
                        for (var index in narudzba){
                            tekst = tekst + '<p><strong>'+narudzba[index].name+ '</strong>,'+narudzba[index].qty+' X <strong>'+ narudzba[index].paketi_kol+'</strong></p>';
                        };
                        var mailOptions = {
                            from: 'mladen.krneta@gmail.com',
                            to: primatelj[0].email,
                            subject: 'Narudzba za Botanicar',
                            html: tekst
                          };
                          transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          })
                }
                );
        }
    );
    }
  };