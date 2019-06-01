const express = require('express');

//import db
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');

//router
const router = express.Router();

router.use((req, res, next) => {
  console.log('Actions Router Working');
  next();
});

//get all actions
router.get('/', async (req, res) => {
  try {
    const allactions = await Actions.get();
    res.status(200).json({ message: allactions });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving actions'
    });
  }
});

//add actions
router.post('/', async (req, res) => {
  try {
    const postaction = await Actions.insert(req.body);
    res.status(201).json({message:postaction});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Project'
    });
  }
});

module.exports = router;
