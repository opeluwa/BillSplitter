const Notifications = require('../models/notifications');
const user = require('../models/user');
const Parties = require('../models/parties');
const PartiesUser = require('../models/parties-user');

function findUserId(email, callback){ // find if user email exists already.
  user.find({email: email}).then(result => {
    if (result){
      callback(null,result[0]._id);
    } else {
      callback('user not found',null);
    }
  })
}

function setPartUser(id, user, value, name) { // add a party to user collection to database.
  return new PartiesUser({
    partyId: id,
    user: user,
    accepted: value,
    groupName: name
  });
}

exports.newParty = (req, res, next) => {  // new party creation
  console.log(req.body);
  user.find({email: req.body.userEmail}).then(foundUsers =>{
    if (foundUsers.length !== req.body.userEmail.length){ // dont add a notification for the user who created the party
      return res.status(404).json({
        message: 'One or more users are not registered'
      })
    }

    if (req.body.userEmail.includes(req.userData.email)){ // check if user is attempting to add themselves to the group.
      return res.status(400).json({
        message: 'You are already in the party. There is no need to add your self',
      });
    }

    req.body.userEmail.push(req.userData.email);

    const Party1 = new Parties({
      groupName: req.body.groupName,
      user: req.userData.userId,
      userEmail: req.body.userEmail,
    });
    Party1.save().then(result => {  // pushed the data to the collection party based upon the model aka  mongoose.model('Party', partySchema)
      req.body.userEmail.forEach(function(value) {
        findUserId(value, function (err,result) {

          setPartUser(Party1._id, result, false, req.body.groupName).save().then(result2 => {
            if( value !== req.userData.email) {
              newPartyNotification(Party1._id, result).save().then(data => {
              });
            }

            if (value === req.userData.email) {
              res.status(201).json({   // response is data unique to that user
                message: 'success',
                content : {
                  groupName: req.body.groupName,
                  user: req.userData.userId,
                  userEmail: req.body.userEmail,
                  id: result2._id,
                  Party: Party1,
                  accepted: result2.accepted
                }
              });
            }
            if (!result){
              return res.status(404).json({
                message: err,
              });
            }
          });
        });
      });

    });
  });
};


exports.getParties = (req, res, next) => { // get all parties that a user is within
  PartiesUser.find({user: req.userData.userId}).populate('partyId').exec(function (err,doc) {
    res.status(200).json({
      message: 'success request ',
      posts: doc
    })
  });
};

exports.leaveParty = (req, res, next) =>{  // leave a party
  console.log(req.body);
  PartiesUser.deleteOne({_id: req.params.id, user: req.userData.userId}).then(result=>{
    if (result.n > 0){ // n is bigger than 0 if successful
      console.log('-----' + req.body.partyId);
      console.log('-----' + req.userData.email);
      Parties.updateOne(
        {"_id": req.body.partyId},
        { "$pull": {"userEmail": req.userData.email}},
        function(err,status) {
        }
      );
      res.status(200).json({ message: "Post deleted!"});
    } else {
      res.status(401).json({ message: "Post not deleted!"});
    }
  });
  // res.status(200).json({ message: "Post deleted!"});
};

function newPartyNotification(partyId, userId) {
  return new Notifications({
    PartyId: partyId,
    show: true,
    userId: userId
  });
}
