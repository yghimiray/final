const userCollection = require('../models/user')
const ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken');
const accessTokenSecret = "Yogesh";
const bcrypt = require('bcrypt')

exports.signUp = async (req, res, next) => {
    try {
        console.log(req.body)
        const exist = await userCollection.findOne({ username: req.body.username })
        if(exist){
            res.json({ error :0} );
        }else{
            const password = await bcrypt.hash(req.body.password, 10) //  generally saltRounds =10
            const user = await userCollection({ ...req.body, password }).save()
            
            const token = jwt.sign({ 
                username: user.username, 
                role: user.role 
            }, accessTokenSecret);
            res.status(200).json({ success:1, token, user });
        }
    } catch (error) {
        next(error)
    }
}


exports.login = async (req, res, next) => {
    try {
        const user = await userCollection.findOne({ username: req.body.username })
        const match = bcrypt.compare(req.body.password, user.password)
        if (!match) {
            throw new Error('Invalid Access')
        } else {
            const token = jwt.sign({ 
                username: user.username, 
                role: user.role 
            }, accessTokenSecret);
            res.status(200).json({ success:1, token, user });
        }
    } catch (error) {
        next(error);
    }
}

exports.authorize = (req, res, next)=>{
    try{
        const header = req.headers.authorization 
        if(!header){
            res.json({error:"Unauthorized"})
        }
        const encr_token = header.split(' ')[1]
        if (encr_token){
            const token = jwt.verify(encr_token, accessTokenSecret, (err, user) => {
                req.user = user;
                req.token= token;
                next()
            })
        }else{
            res.json({error:"Unauthorized"})
        }
    }catch (error){
        next(error)
    }
}

exports.authorizeAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ "error": "Unauthorized" });
    }
}


exports.updateUser = async (req, res, next) => {
    try {
        const user_id = new ObjectId(req.params.user_id);
        const {fullName,username,password,role} = req.body;
        res.status(200).json(await userCollection.updateOne({ _id: user_id }, { 
            $set: {
            fullName,
            username,
            password,
            role   
            } }))
    } catch (error) {
        next(error)
    }
}


exports.searchAllusers = async (req, res, next) => {
    try {
        res.status(200).json(await userCollection.find())
    } catch (error) {
        next(error)
    }
}



exports.deleteUser = async (req, res, next) => {
    try {
        const user_id = new ObjectId(req.params.user_id);
        res.status(200).json(await userCollection.deleteOne({ _id: user_id }))
    } catch (error) {
        next(error)
    }
}

