const voucherCollection = require('../models/voucher');
const ObjectId = require('mongodb').ObjectId

exports.addVoucher = async (req, res, next) => {
    try {
        const voucher = await voucherCollection(req.body).save()
        res.status(200).json(voucher);
    } catch (error) {
        next(error)
    }
}

exports.searchVoucherByNumber = async (req, res, next) => {
    try {
        const number = req.params.number;
        res.status(200).json(await voucherCollection.findOne({ billno: number }))
    } catch (error) {
        next(error)
    }
}


exports.searchAllVouchers = async (req, res, next) => {
    try {
        res.status(200).json(await voucherCollection.find())
    } catch (error) {
        next(error)
    }
}



exports.findLength = async (req, res, next) => {
    try {
        res.status(200).json(await voucherCollection.countDocuments())
    } catch (error) {
        next(error)
    }
}



exports.deleteVoucher = async (req, res, next) => {
    try {
        const voucher_id = new ObjectId(req.params.voucher_id);
        res.status(200).json(await voucherCollection.deleteOne({ _id: voucher_id }))
    } catch (error) {
        next(error)
    }
}
