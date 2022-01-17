const productCollection = require('../models/product');
const ObjectId = require('mongodb').ObjectId

exports.addProduct = async (req, res, next) => {
    try {
        const exist = await productCollection.findOne({ name: req.body.name })
        if(exist){
            res.json({ error :0} );
        }else{
            const product = await productCollection(req.body).save()
            res.status(200).json({ success:1, product} );
        }
    } catch (error) {
        next(error)
    }
}

exports.searchProductById = async (req, res, next) => {
    try {
        const product_id = new ObjectId(req.params.product_id);
        res.status(200).json(await productCollection.findOne({ _id: product_id }))
    } catch (error) {
        next(error)
    }
}

exports.searchProductByName = async (req, res, next) => {
    try {
        const prod_name = req.params.name;
        res.status(200).json(await productCollection.findOne({ name: prod_name }))
    } catch (error) {
        next(error)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const product_id = new ObjectId(req.params.product_id);
        const {name} = req.body;
        res.status(200).json(await productCollection.updateOne({ _id: product_id }, {
             $set: {
                name
             } }))
    } catch (error) {
        next(error)
    }
}


exports.searchAllProducts = async (req, res, next) => {
    try {
        res.status(200).json(await productCollection.find())
    } catch (error) {
        next(error)
    }
}



exports.addAllTransactions = async (req, res, next) => {
        try {
            const name = req.params.name
            const transaction = req.body;
            res.status(200).json(await productCollection.updateOne({ name: name}, { 
                $push: {trans:transaction} }))
        } catch (error) {
            next(error)
        }
    
    }



exports.deleteProduct = async (req, res, next) => {
    try {
        const product_id = new ObjectId(req.params.product_id);
        res.status(200).json(await productCollection.deleteOne({ _id: product_id }))
    } catch (error) {
        next(error)
    }
}
