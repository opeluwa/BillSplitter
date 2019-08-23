const express = require('express');

const checkAuth = require('../middleware/check-auth');
const notificationController = require('../controller/notifications');
const router = express.Router();

router.get("",checkAuth, notificationController.getNotifications );

router.delete("/party", checkAuth, notificationController.deletePartyNotification);

router.delete("/bills", checkAuth, notificationController.deleteBillNotification);

router.delete("/:id", checkAuth, notificationController.deletenotification);

router.post("",checkAuth, notificationController.deleteAllNotifications);

module.exports = router;
