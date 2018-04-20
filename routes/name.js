/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var name_dal = require('../dal/name_dal');

/* GET users listing. */
router.get('/all', function(req, res, next)
{
    name_dal.getAll(function(err, result)
    {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            res.render('name/name_view_all',  {name: result});
        }
    })
});
router.get('/edit', function (req, res) {
    name_dal.getinfo(req.query.name_id, function (err, result) {
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
    res.render('name/name_add');
});
router.get('/insert', function(req, res)  {
    name_dal.insert(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/name/all');
        }
    });
});
router.get('/update', function(req, res) {
    name_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/name/all');
        }
    });
});
module.exports = router;