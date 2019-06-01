const express = require('express');
const helmet = require('helmet');
// const knex = require('knex');

// const knexConfig = {
//   client: 'sqlite3',
//   connection: {
//     filename: './data/sprint.sqlite3',
//     //'./data/rolex.db3'
//   },
//   useNullAsDefault: true, // needed for sqlite
// };

//database
// const db = knex(knexConfig);

//router imports
const projectRouter =require('./routes/project-router');
const actionRouter =require('./routes/action-router');

//server
const server = express();

//express
server.use(express.json());
//middleware
server.use(helmet());

//routers
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);


//main
server.get('/', (req, res) => {
  res.send(`<h2>sprint challeng DB</h2>`);
});

//global error
server.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Global Error!',
    err
  });
});

module.exports = server;
