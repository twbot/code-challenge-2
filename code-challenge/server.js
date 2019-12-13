// REQUIREMENTS
const express       = require('express');
const path          = require('path');
const http          = require('http');
const app           = express();
const port          = process.env.PORT || '4200';
const server        = http.createServer(app);
const mysql			= require('mysql');
const args			= process.argv.slice(2);

const connectionPool = mysql.createPool({
							host: 'localhost',
							user: 'root',
							password: args[0],
							database: 'customers',
							connectionLimit: 10
						});

function getConnection() {
	return connectionPool;
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/customer/:userID', (req, res) => {
	console.log("Fetching user with id: " + req.params.userID);

    const profId = req.params.userID;
    const queryString = "SELECT * FROM customers WHERE id=?";
    
    connectionPool.query(queryString, [profId], (err, obj, fields) => {
      if(err) {
        console.log("GET failed: " + err);
        res.sendStatus(500);
        return;
      }
      res.json(obj);
    });
});


app.get('/getAllUsers', (req, res) => {
	console.log("Fetching users");

    const queryString = "SELECT * FROM customers";

    connectionPool.query(queryString, (err, obj, fields) => {
    	if(err) {
    		console.log("GET failed: " + err);
    		res.sendStatus(500);
    		return;
    	}
    	res.json(obj);
    });
});

app.get('/addCustomer', (req, res) => {
	//FormField would neet to be created with fields for all below
	console.log("Adding customer to database");
	const first_name = req.body.new_first_name;
	const last_name = req.body.new_last_name;
	const email = req.body.new_email;
	const lat = req.body.new_lat;
	const long = req.body.new_email;
	const ip = req.body.new_ip;
	const created_at = null;
	const query = "INSERT INTO customers"+
	"(created_at, first_name, last_name, email, latitude, longitude, ip)"+
	"VALUES"+
	"(?, ?, ?, ?, ?, ?, ?,)";
	connectionPool.query(queryString,
	[created_at, first_name, last_name, email, lat, long, ip],
	(err, results, fields) => {
		if(err) {
			console.log("Could not add customer with error: "+ err);
			res.sendStatus(500);
			return;
		}
		console.log("Inserted new customer");
		res.end();
	});
});

app.get('/customer/remove/:userID', (req, res) => {
	console.log("Deleting user with id: " + req.params.userID);

    const profId = req.params.userID;
    const queryString = "DELETE FROM customers WHERE id=?";
    
    connectionPool.query(queryString, [profId], (err, obj, fields) => {
      if(err) {
        console.log("GET failed: " + err);
        res.sendStatus(500);
        return;
      }
      res.json(obj);
    });
});

// LISTENERS
app.set('port', port);

server.listen(port, () => console.log(`Running on localhost:${port}`));
