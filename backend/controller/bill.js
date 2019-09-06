const partiesUsers = require('../models/parties-user');
const billUser = require('../models/bill-user');
const Notifications = require('../models/notifications');
const user = require('../models/user');
const bill = require('../models/bill');

exports.makeBill = (req, res, next) => {  // make a new bill route

  const url = req.protocol + '://' + req.get("host"); // url of our server  // req.protocol returns whether we are access the server with http or https

  partiesUsers.find({partyId: req.body.partyId}).then(memsInparty =>{ // find all users in the party that the bill belongs to.
    const mainBill = new bill({
      billName: req.body.name,
      cost: req.body.cost,
      dateCreated: new Date().getTime(),
      dateDue: req.body.dateDue,
      partyId: req.body.partyId,
      userId: req.userData.userId,
      description: req.body.description,
      numOfPayers: memsInparty.length,
      imagePath: url + "/images/" + req.file.filename,
      billUsers: []  // empty list of users that will be filed in later.
    });
    mainBill.save().then(() => { // save the bill
      getUsersInParties(mainBill.partyId, function (result) { // get all the users in the parties
        addBillUser(result, mainBill, req.userData.userId);   // make a collection linking users to the just made bill
        res.status(200).json({
          message: 'success'
        });
      });
    });
  });
};

exports.payBill = (req, res, next) => { // user bill is to be paid
  const replacement = new billUser({ // replacement fields with id already set.
    _id: req.body._id,
    partyId: req.body.partyId,
    userId: req.userData.userId,
    billId: req.body.billId,
    paid: true
  });

  billUser.updateOne({_id: req.body._id, userId: req.userData.userId},replacement).then(data => {
    if(data.nModified > 0){ // if bill adding was successful
      res.status(200).json({ message: "Bill payments succeeded"});
    } else {
      res.status(401).json({ message: "bill payment failed"});
    }
  })
};

exports.getBill = (req, res, next) => { // get the bills of a user
  billUser.find({userId: req.userData.userId}).populate('billId').exec(function (err, data) {
    res.status(200).json({
      message: "Success",
      content: data
    });
  });
};


exports.getMyBill = (req, res, next) => { // get all bills that a user made
  bill.find({userId: req.userData.userId}).populate('billUsers').populate('userId').then(data =>{
    res.status(200).json({
      message: "Success",
      content: data
    });
  });
};

function getUsersInParties(partyId, cb){ // returns all userIds in a party
  partiesUsers.find({partyId:partyId}).then(result => {
    array = result.map(function(item){
      return item.user;
    });
    cb(array);
  })
}

function makeBillUser(billId, partyId,UserId,paid, email) { // make the bill for a user
  const data =  new billUser ({
    billId: billId,
    partyId: partyId,
    userId: UserId,
    paid: false,
    email: email
  });

  bill.findOneAndUpdate({_id: billId},{ "$push": { "billUsers": data._id }},{ safe: true, multi:true, useFindAndModify: false }, function (err, obj) {

  });
  return data;
}

function newBillNotification(billId, userId) { // produce a notification object
  return new Notifications({
    BillId: billId,
    show: true,
    userId: userId
  });
}

function addBillUser(result, mainBill, createrId) { // make bills for each user
  result.map(function (item) {
    user.findById(item).then(userEmail => {
      makeBillUser(mainBill._id, mainBill.partyId, item, false, userEmail.email).save().then(data => {
        if( item!== createrId ) {
          newBillNotification(mainBill._id, item).save().then(notificationData => {
          });
        }
      });
    });
  });
}
