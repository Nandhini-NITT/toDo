var express = require('express');
var app = express();
var mysql = require("mysql");
var path = require('path');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "toDos"
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
var port = 8080;
app.listen(port, function () {
    console.log('Listening on port: ' + port);
});
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/todos',function(req,res){
	con.query('Select * from toDos',function(error,rows){
		if(error) throw error;
		else
			{
        console.log('data');
        console.log(rows);
        res.send(rows);
      }
	});
});
app.get('/app.js',function(req,res){
  res.sendFile(path.join(__dirname + '/app.js'));
});
app.get('/addTodo',function(req,res){
  var task={task:req.query.task};
  con.query('insert into toDos set ?',task,function(error,response){
    if(!error) 
      {
        var insertedTask={id:response.insertId,task:req.query.task};
        console.log(insertedTask);
        res.send(insertedTask);
      }

  });
});
app.get('/deleteTodo',function(req,res){
  var id=req.query.id;
  console.log(id);
  con.query('delete from toDos where id=?' ,id,function(error,response){
    console.log(response);
    if(!error) res.send(id);
  });
});