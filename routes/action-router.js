const router = require('express').Router();

const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/sprint.db3'
  }
};

const db = knex(knexConfig);

// //logger
// router.use((req, res, next) => {
//   console.log('Project Router Working!');
//   next();
// });

//get projects
router.get('/', (req, res) => {
  db('actions')
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//add new project
router.post('/', async (req, res) => {
  try {
    const action = await db('actions').insert(req.body);
    res.status(201).json({ message: action });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Action'
    });
  }
});

module.exports = router;
