const express = require('express');
const database = require('../database');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/users');
const Institutes = require('../models/institutes');
const Courses = require('../models/courses');
const Contents = require('../models/contents');
const router = express.Router();
//router.use(authMiddleware); //verificar

router.delete('/remove', async (req, res) => {

  let institutes = await Institutes.find();
  let courses = await Courses.find();
  let contents = await Contents.find();

  if(institutes.length == 0 && courses.length == 0 && contents.length == 0){
    return res.status(400).send({
      'message' : 'Institute not found',
      'status' : false
    });
  }

 // await database.dropDatabase();

  return res.status(200).send({
    'message' : 'Institute Deleted Successfully',
    'status' : true
  });
});

router.get('/list/name/:name', async (req, res) => {
  const { name } = req.params;

  if(name == '' || name == undefined || name == null){
    return res.status(400).send({
      'message' : 'Error institute id invalid',
      'status' : false
    });
  }

  let institutes = await Institutes.find({name:name});

  if(institutes.length == 0){
    return res.status(400).send({
      'message' : 'Error id of invalid institute',
      'status' : false
    });
  }

  let contents = await Contents.find();

  if(contents.length == 0){
    return res.status(400).send({
      'message' : 'Error no content found',
      'status' : false
    });
  }

  return res.status(200).send({
    'data' : [institutes,contents],
    'message' : 'Institute Loaded Successfully',
    'status' : true
  });
});

router.post('/create', async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "accept, content-type");
  res.header("Access-Control-Max-Age", "1728000");

    const { name, url } = req.body;

    if( !name || !url ){
      return res.status(400).send({ error: 'The values [name, url] are required to register Institute' });
    }

    let institutes = await Institutes.findOne({name: name});
   
    if(!institutes || institutes == null || institutes == undefined){
      const botOne = require('../bots/cetrus/botOne');
      botOne(url, name);
      res.status(200).send('botOne success');
      return;
    }

    let institutesNew = await Institutes.find({name: name});

    if(institutesNew.length > 0){
      let courses = await Courses.find({institutesId: institutesNew[0].institutesId});
      
      if(!courses || courses.length == 0 || courses.length == false){
        Object.keys(institutesNew).map(function(idx){
          const botTwo = require('../bots/cetrus/botTwo');
          botTwo(institutesNew[idx].url, institutesNew[idx].institutesId);
        });
        res.status(200).send('botTwo success');
        return;
      }
      
      if(courses.length > 0 ){
        for (let idx in institutesNew) {
          const contents = await Contents.find({institutesId: institutesNew[idx].institutesId});
          const coursesNew = await Courses.find({institutesId: institutesNew[idx].institutesId});
          if(coursesNew.length > contents.length){
            Object.keys(coursesNew).map(function(idxs){
              const botTree = require('../bots/cetrus/botTree');
              botTree(coursesNew[idxs].url, coursesNew[idxs].institutesId, coursesNew[idxs].coursesId, coursesNew[idxs].url);
            });
          }
        }
        res.status(200).send('botTree success');
        return;
      }
    }
    return res.status(200).send('Bot aready executed');
  });

module.exports = app => app.use('/crawler', router);