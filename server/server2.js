const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

const db = require('./database');
const app = express();

app.use(express.json());
app.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, //povoli cookie ze budu dostupne
   })
);
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(
//    session({
//       key: 'userId',
//       secret: 'somethingVerySecret',
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//          //  expires: 60 * 60 * 24,
//          expires: 5 * 60 * 1000,
//       },
//    })
// );

app.listen(3001, () => {
   console.log('Server running on port 3001');
});

//****img */
app.use(express.static('Public'));
app.use(
   fileUpload({
      createParentPath: true,
   })
);
///****** */

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

// const validation = require('./Middlewares/validationMiddleware');
// const registerSchema = require('./Validations/registerValidation');

/**
================
TESTOVANIE
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

app.post('/test', (req, res) => {
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
