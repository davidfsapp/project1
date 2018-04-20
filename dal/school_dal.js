/**
 * Created by student on 3/15/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback)
{
    var query = 'SELECT * FROM school;';

    connection.query(query, function(err, result)
    {
        callback(err, result);
    });
};

exports.insert = function(params, callback)  {
    var query = 'INSERT INTO school (school_name) VALUES (?)';

    var queryData = [params.school_name];

    connection.query(query, queryData, function(err, result)  {
        if(err || params.address_id === undefined) {
            console.log(err);
            callback(err, result);
        } else {
            var company_id = result.insertId;
            var query = 'INSERT INTO school_address (school_id, address_id) VALUES ?';
            var schoolAddressData = [];

            if (params.address_id.constructor === Array){
                for (var i = 0; i < params.address_id.length; i++) {
                    schoolAddressData.push(
                        [school_id, params.address_id[i]]
                    );
                }
            }
            else {
                schoolAddressData.push([school_id,
                    params.address_id]);
            }
            connection.query(query, [schoolAddressData],
                function (err, result) {
                    callback(err, result);
                });
        }
    });
};
exports.getinfo = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [company_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
var schoolAddressInsert = function(school_id, addressIdArray,
                                    callback){
    var query = 'INSERT INTO school_address (school_id, address_id)' +
        'VALUES ?';
    var schoolAddressData = [];
    if (addressIdArray.constructor === Array) {
        for (var i = 0; i < addressIdArray.length; i++) {
            schoolAddressData.push([school_id, addressIdArray[i]]);
        }
    }
    else {
        schoolAddressData.push([school_id, addressIdArray]);
    }
    connection.query(query, [schoolAddressData], function(err,result){
        callback(err, result);
    });
};

var schoolAddressUpdate = function(school_id, addressIdArray, callback){
    var query = 'CALL school_address_delete(?)';

    connection.query(query, company_id, function (err, result){
        if(err || addressIdArray === undefined) {
            callback(err, result);
        } else {
            schoolAddressInsert(school_id, addressIdArray, callback);
        }
    });
};
exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ? WHERE school_id = ?';
    var queryData = [params.school_name, params.school_id];

    connection.query(query, queryData, function(err, result) {
        schoolAddressUpdate(params.school_id, params.address_id, function (err, result) {
            callback(err, result);
        });
    });
};