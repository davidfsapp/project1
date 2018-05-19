/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM email;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)  {
    var query = 'INSERT INTO email (main_email, work_email) VALUES (?, ?)';
    var queryData = [params.main_email, params.work_email];

    connection.query(query, queryData, function(err, result)  {
        callback(err, result);
    });
};

exports.getinfo = function (email_id, callback) {
    var query = "call email_getinfo(?)";
    var queryData = [email_id];

    connection.query(query, queryData, function (err, result) {
        callback(err, result);
    });
};

exports.update = function (params, callback) {
    var query = 'update email set main_email = ?, work_email = ? where email_id = ?';
    var queryData = [params.main_email, params.work_email, params.email_id];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};
exports.delete = function(params, callback) {
    var query = 'delete from email where email_id = ?';
    var queryData = [params.email_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, result);
    });
};
exports.insert = function(params, callback)  {
    var query = 'INSERT INTO email (email_id, main_email, work_email) VALUES (?, ?, ?)';
    var queryData = [params.email_id, params.main_email, params.work_email];

    connection.query(query, queryData, function(err, result)  {
        callback(err, result);
    });
};