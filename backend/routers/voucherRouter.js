const express = require('express');
const voucherRouter = express.Router();
const voucherController = require('../controllers/voucherController');

voucherRouter.post('/',voucherController.addVoucher);
voucherRouter.get('/:number',voucherController.searchVoucherByNumber);
// voucherRouter.get('/allvouchers',voucherController.searchAllVouchers);
voucherRouter.get('/', voucherController.findLength)
voucherRouter.delete('/:voucher_id', voucherController.deleteVoucher)



module.exports = voucherRouter;