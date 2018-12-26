let express = require('express');
let router = express.Router();

let User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.status(200).json({
    code : 200,
    message : 'Responded with success',
    data : []    
  });
});

router.get('/getallusers',(req,res)=>{
  User.find().then(
    allusers=>{
      if(allusers){
        return res.status(200).json({
          code : 200,
          message : 'All users found',
          data : allusers
        });
      }
    }
  )
});

router.post('/newuser',(req,res)=>{
  let name = req.body.name;
  let email = req.body.email;
  if(!name){
    return res.status(400).json({
      code : 400,
      message : 'Name is required',
      data : []
    });
  }
  if(!email){
    return res.status(400).json({
      code : 400,
      message : 'Email is required',
      data : []
    });
  }
  else{
    User.findOne({email : email}).then(
      (user) => {
          if(user){
              return res.status(400).json({ error : 'User already exits.Try new email.' });
          }
          else{
              createNewUser();
          }
      }
    ).catch((err) => {
        console.error("Error occured ",+err);
    });
  }

  async function createNewUser(){
    const newUser = new User({
      name : name,
      email : email
    });
    newUser.save().then(
      newuser=>{
        if(newuser){
          return res.status(200).json({
            code : 200,
            message : 'New user added',
            data : []
          });
        }
        else{
          return res.status(200).json({
            code : 400,
            message : 'Something went wrong',
            data : []
          });
        }
      }
    );
  }
});

module.exports = router;
