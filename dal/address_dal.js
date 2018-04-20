/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM address;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)  {
    var query = 'INSERT INTO address (street, zip_code) VALUES (?, ?)';
    var queryData = [params.street, params.zip_code];

    connection.query(query, queryData, function(err, result)  {
        callback(err, result);
    });
};

exports.getinfo = function (address_id, callback) {
    var query = "call address_getinfo(?)";
    var queryData = [address_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.update = function (params, callback) {
    var query = 'update address set street = ?, zip_code = ? where address_id = ?';
    var queryData = [params.street, params.zip_code, params.address_id];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};