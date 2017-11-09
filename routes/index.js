var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection;
var handleDisconnect = function(){
	connection = mysql.createConnection({
							host:'localhost',
							user : 'root',
							password : '',
							database : 'torrent'
						});
		 
	connection.connect(function(err){
		if(err){
		  console.log(err);
		}else{
		  console.log("Connected as id" + connection.threadId);
		}
	});

	connection.on('error', function(err){
		console.log("DB ERROR "+err);
		if(err.code == 'PROTOCOL_CONNECTION_LOST'){
			handleDisconnect();
		}else{
			console.log('CANNOT handleDisconnect');
			throw err;
		}
	});
}

handleDisconnect();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getTracker', function(req, res, next){
	connection.query({
		sql : "select * from tracker_list where file_id = ?",
		values : [req.query.fileId]
	}, function(err, r, f){
		if(err){
			console.log(err);
		}else{
			res.send(r);
		}
	});
});

module.exports = router;
