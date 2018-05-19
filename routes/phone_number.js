/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var phone_number_dal = require('../dal/phone_number_dal');

/* GET users listing. */
router.get('/all', function(req, res, next)
{
    phone_number_dal.getAll(function(err, result)
    {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            res.render('phone_number/phone_number_view_all',  {phone_number: result});
        }
    })
});
router.get('/edit', function (req, res) {
    phone_number_dal.getinfo(req.query.phone_number_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('phone_number/phone_number_update',
                {phone_number: result[0][0]}
            );
        }
    });
});
router.get('/add', function(req, res)  {
    res.render('phone_number/phone_number_add');
});
router.get('/insert', function(req, res)  {
    phone_number_dal.insert(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/phone_number/all');
        }
    });
});
router.get('/update', function(req, res) {
    phone_number_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/phone_number/all');
        }
    });
});
router.get('/delete', function(req, res) {
    var deleteID = req.query.phone_number_id;
    phone_number_dal.delete(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/phone_number/all?phone_number_id=' + deleteID + '&was_successful=1');
        }
    });
});
module.exports = router;