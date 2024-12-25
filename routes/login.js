const express = require('express');
const routes = express.Router();
const loginmodel = require('../model/login');
const xss = require('xss');

// Example: Fetch data from MySQL
routes.get('/users', (req, res) => {
    loginmodel.getAllUsers((err,users) =>{
        if (err) {
          return res.status(500).send({ error: 'Database query failed', message: err.message });
        }
        res.json(users);
      });
  });

  routes.post('/login', async (req,res) =>{
        const email = xss(req.body.email);
        const password = xss(req.body.password);

        if(email == ''){
            return res.statusCode(500).send({error:'E-mail ID can not be empty'});
        }
        if(password == ''){
            return res.statusCode(500).send({error:'Password can not be empty'});
        }

        await loginmodel.validateCredential({ email, password },(err,user) =>{
            if(err){
                return res.status(500).send({error:"E-Mail Id or Password is wrong", message:err.message});
            }else{
                req.session.userData = user;
                console.log(req.session);
                res.json(user);
            }
        })
  });
  module.exports = routes;
