/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM physical_address;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)  {
    var query = 'INSERT INTO physical_address (street_num, street, zip_code) VALUES (?, ?, ?)';
    var queryData = [params.street_num, params.street, params.zip_code];

    connection.query(query, queryData, function(err, result)  {
        callback(err, result);
    });
};

exports.edit = function (physical_address_id, callback) {
    var query = "call physical_address_getinfo(?)";
    var queryData = [physical_address_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.update = function (params, callback) {
    var query = 'update physical_address set street_num = ?, street = ?, zip_code = ? where physical_address_id = ?';
    var queryData = [params.street_num, params.street, params.zip_code, params.physical_address_id];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};
exports.delete = function(params, callback) {
    var query = 'delete from physical_address where physical_address_id = ?';
    var queryData = [params.physical_address_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
