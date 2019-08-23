const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const billController = require('../controller/bill');

const extractFile = require('../middleware/file');

router.post("", checkAuth, extractFile, billController.makeBill);

router.put("/paybill",checkAuth, billController.payBill);

router.get("", checkAuth, billController.getBill);

router.get("/myBills", checkAuth, billController.getMyBill);



module.exports = router;
