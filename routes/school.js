/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var address_dal = require('../dal/address_dal');
var school_dal = require('../dal/school_dal');

/* GET users listing. */
router.get('/all', function(req, res, next) {
    school_dal.getAll(function(err, result) {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            res.render('school/school_view_all', {school: result, was_successful: req.query.was_successful});
        }
    })
});
router.get('/add', function(req, res) {
    address_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('school/school_add', {
                address_result:
                    result
            });
        }
    });
});
router.get('/edit', function (req, res) {
    school_dal.getinfo(req.query.school_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('school/schoolUpdate',
                {school: result[0][0], address_result: result[1]}
            );
        }
    });
});
router.get('/insert', function(req, res)  {
    school_dal.insert(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/school/all');
        }
    });
});
router.get('/update', function(req, res) {
    school_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/school/all');
        }
    });
});
router.get('/delete', function(req, res) {
    school_dal.delete(req.query.school_id, function(err, school_id){
        if (err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/school/all?school_id=' + school_id + '&was_successful=1');
        }
    });
});
module.exports = router;