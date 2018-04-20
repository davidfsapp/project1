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
    phone_number_dal.getinfo(req.query.name_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('name/nameUpdate',
                {name: result[0][0]}
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
module.exports = router;