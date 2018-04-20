/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM name;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)  {
    var query = 'INSERT INTO name (name_id, first_name, last_name, middle_init) VALUES (?, ?, ?, ?)';
    var queryData = [params.name_id, params.first_name, params.last_name, params. middle_init];

    connection.query(query, queryData, function(err, result)  {
        callback(err, result);
    });
};

exports.getinfo = function (name_id, callback) {
    var query = "call name_getinfo(?)";
    var queryData = [name_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.update = function (params, callback) {
    var query = 'update name set first_name = ?, last_name = ?, middle_init = ? where name_id = ?';
    var queryData = [params.first_name, params.last_name, params.middle_init, params.name_id];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};
