/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var email_dal = require('../dal/email_dal');

/* GET users listing. */
router.get('/all', function(req, res, next)
{
    email_dal.getAll(function(err, result)
    {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(result);
            res.render('email/email_view_all',  {email: result});
        }
    })
});
router.get('/edit', function (req, res) {
    email_dal.getinfo(req.query.name_id, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('email/emailUpdate',
                {name: result[0][0]}
            );
        }
    });
});
router.get('/add', function(req, res)  {
    res.render('email/email_add');
});
router.get('/insert', function(req, res)  {
    email_dal.insert(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else {
            res.redirect(302, '/email/all');
        }
    });
});
router.get('/update', function(req, res) {
    email_dal.update(req.query, function(err, result) {
        if(err) {
            res.send(err);
        }
        else {
            res.redirect(302, '/email/all');
        }
    });
});
module.exports = router;