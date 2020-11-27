var express = require('express');
const { inArray } = require('jquery');
const { User } = require('../models/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

// Login handle 
router.get('/login',(req, res)=>{
  res.render('login');
})

router.get('/register',(req, res)=>{
  res.render('register');
})

// Register handle
router.post('/login',(req, res, next)=>{
})

// Register post handle 
router.post('/register',(req, res)=>{
  const {name, email, password1, password2} = req.body;
  let errors = [];
  console.log('Name' + name + 'email' + email + 'password:' + password1);
    if(!name || !email || !password1 || password2) {
      errors.push({msg : "Error, field not complete"})
    }
    if(password1 !== password2) {
      errors.push({msg : "passwords do not match"})
    }
    if(password1.length < 6) {
      errors.push({msg : "password must have more than 6 characters"})
    }
    if(errors.length > 0) {
      res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password1 : password1,
        password2 : password2})
    } 
    else {
      User.findOne({email : email}).exec((err,user)=>{
        console.log(user);
        if(user) {
          errors.push({msg : "email already registed with another account"});
          res.render('register',{errors,name,email,password1, password2})
        }
        else 
        {
          const newUser = new User ({
            name : name, 
            email : email, 
            password1 : password1,
            password2 : password2
        });

        bcrypt.genSalt(10,(err,salt)=>
        bcrypt.hash(newUser.password,salt,
          (err,hash)=>{
            if(err) throw err;
            newUser.password1 = hash;
            newUser.save()
            .then((value)=>{
              console.log(value)
              res.redirect('/users/login');
            })
            .catch(value=>console.log(value));
          }));
          }
        })
      }
    })
    
// logout
router.get('/logout',(req, res)=>{
})

module.exports = router;