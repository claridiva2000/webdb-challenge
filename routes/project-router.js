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

// router.use((req, res, next) => {
//   console.log('Actions Router Working');
//   next();
// });

//get all actions
router.get('/', (req, res) => {
  db('projects')
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//add actions
router.post('/', async (req, res) => {
  try {
    const postaction = await db.insert(req.body);
    res.status(201).json({ message: postaction });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Project'
    });
  }
});

//get by id
router.get('/project/:id', (req, res) => {
  const { id } = req.params;
      db('projects')
         .where({ id: id })
         .first()
         .then(projects => {
             db('actions')
               .where({ project_id: id }).then(actions => {
              (projects.actions = actions);
                return res.status(200).json(projects);
              });
         })
          .catch(err => {
              res.status(500).json({ Error: "can't get project" })
          });
});

module.exports = router;
