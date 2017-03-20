var express = require('express');
var app = express();
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "assistant"
});
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
var port = config.port || 8080;
app.listen(port, function () {
    console.log('Listening on port: ' + port);
});
app.get('/',function(req,res){
	res.sendFile('./public/index.html');
});
app.get('/todos',function(req,res){
	con.query('Select * from toDos',function(error,rows){
		if(error) throw error;
		else
			res.send(rows);
	});
});