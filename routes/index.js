var express = require('express');
var mysql = require('mysql2');
var config = require('../config/config');

var con = mysql.createConnection(config.db);

var router = express.Router();

router.post('/create', async function(req, res, next) {
	try{
		let date = new Date();

		let create = await con.promise().query(`INSERT INTO invoice (number, date, comment) 
																						VALUES (?,?,?)`, [req.body.number, date, req.body.comment]);
		console.log(create)
		res.status(200).send(create)
	}catch(e){
		console.log(e);
		res.send(e);
	}
});

router.post('/update', async function(req, res, next) {
	try{
		let update = await con.promise().query(`UPDATE invoice SET number = ?, date = NOW(), comment = ? WHERE id = ?`, 
																						[req.body.number, req.body.comment, req.body.inv_id]);
		console.log(update)
		res.send(update);
	}catch(e){
		console.log(e);
		res.send(e);
	}
})

router.delete('/delete', async function(req, res, next) {
	try{
		let del = await con.promise().query(`DELETE FROM invoice WHERE id = ?`, [req.body.inv_id])
		console.log(del)
		res.send(del);
	}catch(e){
		console.log(e);
		res.send(e);
	}
})

router.get('/list', async function(req, res, next) {
	try{
		let select = await con.promise().query(`SELECT * FROM invoice`);
		console.log(select[0]);
		res.status(200).send(select[0])
	}catch(e){
		console.log(e);
		res.send(e);
	}
})

module.exports = router;
