const accountCollection = require('../models/account');
const ObjectId = require('mongodb').ObjectId

exports.addAccount = async (req, res, next) => {
    try {
        const exist = await accountCollection.findOne({ name: req.body.name })
        if(exist){
            // throw new Error({error:1}) 
            res.json({ error :0} );
        }else{
            const account = await accountCollection(req.body).save()
            res.status(200).json({ success:1, account} );
        }
    } catch (error) {
        next(error)
    }
}

exports.searchAccountById = async (req, res, next) => {
    try {
        const account_id = new ObjectId(req.params.account_id);
        res.status(200).json(await accountCollection.findOne({ _id: account_id }))
    } catch (error) {
        next(error)
    }
}

exports.searchAccountByName = async (req, res, next) => {
    try {
        const name = req.params.name;
        res.status(200).json(await accountCollection.findOne({ name: name }))
    } catch (error) {
        next(error)
    }
}

exports.updateAccount = async (req, res, next) => {
    try {
        const account_id = new ObjectId(req.params.account_id);
        const {name} = req.body;
        res.status(200).json(await accountCollection.updateOne({ _id: account_id }, {
             $set: {
                name
             } }))
    } catch (error) {
        next(error)
    }
}


exports.searchAllAccounts = async (req, res, next) => {
    try {
        res.status(200).json(await accountCollection.find())
    } catch (error) {
        next(error)
    }
}



exports.addTransactions = async (req, res, next) => {
        try {
            const name = req.params.name
            const transaction = req.body;
            res.status(200).json(await accountCollection.updateOne({ name: name}, { 
                $push: {trans:transaction} }))
        } catch (error) {
            next(error)
        }
    
    }



exports.deleteAccount = async (req, res, next) => {
    try {
        const account_id = new ObjectId(req.params.account_id);
        res.status(200).json(await accountCollection.deleteOne({ _id: account_id }))
    } catch (error) {
        next(error)
    }
}
