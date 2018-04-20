/**
 * Created by student on 3/15/18.
 */
/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var address_dal = require('../dal/address_dal');

/* GET users listing. */
router.get('/all', function(req, res)
{
    address_dal.getAll(function(err, result)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('address/address_view_all',  {result: result});
        }
    })
});
router.get('/edit', function(req, res) {
    address_dal.getinfo(req.query.address_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('address/addressUpdate',
                {result: result[0][0]}
            );
        }
    });
});
router.get('/add', function(req, res)  {
    res.render('address/address_add');
});
router.get('/insert', function(req, res)  {
    address_dal.insert(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/address/all');
        }
    });
});
router.get('/update', function(req, res) {
    address_dal.update(req.query, function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/address/all');
        }
    });
});
module.exports = router;