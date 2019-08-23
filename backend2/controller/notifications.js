const notifications = require('../models/notifications');

exports.getNotifications = (req, res, next) =>{ // get all notifications for a user
  notifications.find({ userId: req.userData.userId, PartyId: { $ne: null }}).populate('PartyId').exec(function(err, data) { // find all notifications for that user that are party requests
    notifications.find({userId: req.userData.userId, show: true, BillId: { $ne: null }}).populate('BillId').exec(function(err, data2) { // find all notifications for that user that are new bills.
      res.status(200).json({
        message: 'Success',
        notificationsBills: data2,
        notificationsParty: data
      });
    });
  });
};

exports.deletePartyNotification = (req,res, next) => { // deletes all party notifications for a user.
  notifications.deleteMany({userId: req.userData.userId, PartyId : { $ne : null }}).then(() => {
    res.status(200).json({
      message: 'success'
    })
  })
};

exports.deleteBillNotification =  (req,res, next) => {
  notifications.deleteMany({userId: req.userData.userId, BillId : { $ne : null }}).then(() => {
    res.status(200).json({
      message: 'success'
    })
  })
};

exports.deletenotification = (req, res, next) =>{  // delete a specific notification for a user
  notifications.deleteOne({_id: req.params.id, userId: req.userData.userId}).then(data => {
    res.status(200).json({
      message: 'Success'
    });
  })
};

exports.deleteAllNotifications =  (req, res, next) => {  // deletes all notifications for a user
  notifications.remove({userId: req.userData.userId}).then(() => {
    res.status(200).json({
      message: 'Success'
    });
  });
};
