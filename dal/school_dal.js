/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection');
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM school;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};
exports.insert = function(params, callback) {
    var query = 'INSERT INTO school (school_name, address_id) VALUES (?, ?)';
    var queryData = [params.school_name, params.address_id];

    connection.query(query, queryData, function (err, result) {

        callback(err, result);
    });
};
exports.getinfo = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ?, address_id = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {
            callback(err, result);
        });
};

exports.delete = function(school_id, callback) {
    var query = 'delete from school where school_id = ?';
    var queryData = [school_id];
    connection.query(query, queryData, function(err, result)
    {
        callback(err, school_id);
    });
};