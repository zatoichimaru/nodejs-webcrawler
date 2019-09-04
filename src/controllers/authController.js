const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const router = express.Router();

const User = require('../models/users');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        if( await User.findOne({ email })){
            return res.status(400).send({ error: 'User already exists' });
        }

        const user = await User.create(req.body);
        
        user.password = undefined;

        return res.send({ 
            data : user,
            token: generateToken({ id: user.id }),
        });
    } catch (err){
        console.log(err);
        return res.status(400).send({ error : 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if( !user ){
        return res.status(400).send({ error : 'User not found' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({ 
        data : user, 
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/auth', router);