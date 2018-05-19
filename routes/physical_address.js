/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var physical_address_dal = require('../dal/physical_address_dal');

/* GET users listing. */
router.get('/all', function(req, res, next)
{
    physical_address_dal.getAll(function(err, result)
    {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            res.render('physical_address/physical_address_view_all',  {physical_address: result});
        }
    })
});
router.get('/edit', function (req, res) {
    physical_address_dal.edit(req.query.physical_address_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('physical_address/physical_address_update',
                {physical_address: result[0][0]}
            );
        }
    });
});
router.get('/add', function(req, res)  {
    res.render('physical_address/physical_address_add');
});
router.get('/insert', function(req, res)  {
    physical_address_dal.insert(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/physical_address/all');
        }
    });
});
router.get('/update', function(req, res) {
    physical_address_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/physical_address/all');
        }
    });
});
router.get('/delete', function(req, res) {
    var deleteID = req.query.physical_address_id;
    physical_address_dal.delete(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/physical_address/all?physical_address_id=' + deleteID + '&was_successful=1');
        }
    });
});
module.exports = router;