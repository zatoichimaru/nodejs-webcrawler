const express = require('express');

const Institutes = require('../models/institutes');

const router = express.Router();

router.post('/create', async (req, res) => {
    try{
        if( await Institutes.findOne({ name })){
            return res.status(400).send({ error: 'Institutes already exists' });
        }
        const institutes = await Institutes.create(req.body);

        return res.send({ 'data' : institutes });
    } catch (err){
        console.log(err);
        return res.status(400).send({ error : 'Institutes failed' });
    }
});

module.exports = app => app.use('/institutes', router);