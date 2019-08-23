const bcrypt = require("bcryptjs");
const user = require('../models/user');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res, next) => { // log a user into the system
  let fetchedUser;
  user.findOne({email: req.body.email}).then(user => {
    fetchedUser = user;
    if (!user) {
      return res.status(401).json({
        message: 'EMAIL_NOT_FOUND'
      });
    }

    return bcrypt.compareSync(req.body.password, fetchedUser.password); // compare the hashed passwords

  }).then(result => {

    if (!result) {
      return res.status(401).json({
        message: 'INVALID_PASSWORD'
      });
    }
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: '1h'});  // create a token with 1 hour to expire
    res.status(200).json({
      email: fetchedUser.email,
      localId: fetchedUser._id,
      expirationTime: new Date().getTime() + 3600000, // token expire date in milliseconds
      token
    })
  }).catch(err => {

    return res.status(401).json({
      message: 'Auth failed'
    });
  })
};

function findUserId(email, callback) {  // check if user exists in the system
  user.findOne({email: email}).then(result => {

    if (!result) {
      callback(null, "Doesnt exist");
    } else {
      callback('user already exist', null);
    }
  })
}


exports.createUser = (req, res, next) => { // create a new user
  findUserId(req.body.email, function (err,result) {  // check if a use exists
    if (err){
      return res.status(401).json({
        message: 'Email is already registered'
      });
    }
    bcrypt.hash(req.body.password, 10).then(hash => {  // create a has of the user
      const userdata = new user({
        email: req.body.email,
        password: hash
      });
      userdata.save().then(data => {
        const token = jwt.sign({email: req.body.email, userId: userdata._id}, process.env.JWT_KEY, {expiresIn: '1h'}); // create a token with 1 hour to expire
        res.status(200).json({
          email: req.body.email,
          localId: userdata._id,
          expirationTime: new Date().getTime() + 3600000,  // token expire date in milliseconds
          token
        });
      }).catch(err =>{
        res.status(200).json({
          message: 'error found',
          result: err
        });
      })
    })
  })
};


exports.GetId = (req, res, next) => { // get a users ID
  user.findById(req.params.id).then(data => {
    return res.status(200).json({
      message: 'success',
      content: data.email
    });
  });
}



