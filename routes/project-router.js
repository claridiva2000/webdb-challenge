const express = require('express');

const Projects = require('../data/helpers/projectModel');
// const Actions = require('./actionModel');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Project Router Working!');
  next();
});

//get projects
router.get('/', async (req, res) => {
  try {
    const allprojects = await Projects.get();
    res.status(200).json({message: allprojects});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving Projects'
    });
  }
});

//add new project
router.post('/', async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json({message:project});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Project'
    });
  }
});