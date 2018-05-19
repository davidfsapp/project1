/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM phone_number;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)  {
    var query = 'INSERT INTO phone_number (cell_num, work_num, home_num) VALUES (?, ?, ?)';
    var queryData = [params.cell_num, params.work_num, params.home_num];

    connection.query(query, queryData, function(err, result)  {
        callback(err, result);
    });
};

exports.getinfo = function (phone_number_id, callback) {
    var query = "call phone_number_getinfo(?)";
    var queryData = [phone_number_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};
exports.delete = function(params, callback) {
    var query = 'delete from phone_number where phone_number_id = ?';
    var queryData = [params.phone_number_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.update = function (params, callback) {
    var query = 'update phone_number set cell_num = ?, work_num = ?, home_num= ? where phone_number_id = ?';
    var queryData = [params.cell_num, params.work_num, params.home_num, params.phone_number_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
