const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

const db = require('./database');
const app = express();

//****img */
app.use(express.static('Public'));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

/**
===========
ROUTES
===========
 */

const registerRoute = require('./routes/register');
const loginRouter = require('./routes/login');
const vypozickaRouter = require('./routes/vypozicka');
const autaRouter = require('./routes/auta');

app.use('/register', registerRoute);
app.use('/login', loginRouter);
app.use('/vypozicka', vypozickaRouter);
app.use('/auta', autaRouter);

const validation = require('./Middlewares/validationMiddleware');
const registerSchema = require('./Validations/registerValidation');

/**
================
TESTOVACI ODPAD
================
 */

const basicSelect = async (table = '', whatIWant = '', whereKey = '', paramWhere = '') => {
  if (!table) return 'missing params';

  whatIWant = whatIWant || '*';
  if (!!whereKey && !paramWhere) return 'missing param'; //ak mam where key ale nemam hodnotu"

  const sqlWhere = whereKey === '' ? '' : `WHERE ${whereKey} = ?`;
  const sql = `SELECT ${whatIWant} FROM ${table} ${sqlWhere}`;
  console.log(sql);
  // const daco = await db.query(sql, paramWhere, (err, result) => {
  //   err && console.log(err);
  //   console.log('tu2');
  //   console.log(result);
  //   return result[0][whatIWant];
  // });
  try {
    const result = await db.query(sql, paramWhere);
    console.log('tu3');
    console.log(result[0][0].image);
    return result[0][0].image;
  } catch (error) {
    console.log(error);
  }
};

app.post('/test', validation(registerSchema), (req, res) => {
  // const tmp = await basicSelect('autaa', 'image', 'id', 37);
  // console.log('tu');
  // res.send(tmp);
  // console.log(tmp);
  res.status(200).send(req.body);
  // res.send('test');
  // res.send(tmp);
  // deleteImage();
  // const tmp = await vyberVSetko();
  // console.log('tu2');
});
