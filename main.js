const express = require('express');
const app = express();
const config = require('./config.json');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: config.mysql.ip,
  user: config.mysql.usuario,
  password: config.mysql.senha,
  database: config.mysql.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("[MySQL]", "Conectado com sucesso!");
});

app.get('/:licenca', function(req,res){
	var timestamp = new Date().getTime();
	con.query(`SELECT * FROM licencas WHERE licenca = '${req.params.licenca}'`, function (err, row) {
	    if (row && row.length ) {
            res.json({licenca:req.params.licenca,titulo:"Licença válida",timestamp:timestamp,codigo:200});
        } else {
	        res.json({licenca:req.params.licenca,titulo:'Licença inválida',timestamp:timestamp,codigo:404});
        }
    });
});



app.listen(config.porta, function(){
	console.log(`Rodando na porta`,config.porta);
});