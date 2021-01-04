const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

//****img */
app.use(express.static('Public'));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
const carImagePath = './Public/Images/';

const deleteImage = (filePath) => {
  fs.stat(filePath, function (err, stats) {
    console.log(stats); //here we got all information of file in stats variable

    if (err) {
      return console.error(err);
    }

    fs.unlink(filePath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
  });
  res.send('deleted');
};
//****img */

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// cors({
//   origin: ['http://localhost:3000'],
//   methods: ['GET', 'POST'],
//   credentials: true,

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

const db = mysql.createPool({
  host: 'localhost',
  user: 'tomas',
  password: 'tomas',
  database: 'cruddb1',
});

// ==========================================

app.get('/test', (req, res) => {
  res.send('hello world');
  deleteImage('./Public/Images/scr_overenie basic DB username.png');
});

//======IMG=============
app.post('/picture/:spz', async (req, res) => {
  const spz = req.params.spz;
  console.log(spz);
  try {
    if (!req.files) {
      res.send({
        stat: false,
        msg: 'No files',
      });
    } else {
      const { picture } = req.files;
      console.log(picture);
      console.log(picture.name);
      const fullPath = carImagePath + picture.name;
      picture.mv(`${fullPath}`);

      const sql = 'INSERT INTO car_image (spz, path) VALUES (?,?)';
      db.query(sql, [spz, fullPath], (err, res) => {
        err && console.log(err);
      });

      res.send({
        stat: true,
        msg: 'File is uploaded',
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//update
app.put('/update/picture/:spz', async (req, res) => {
  const spz = req.params.spz;
  console.log(spz);
  try {
    if (!req.files) {
      res.send({
        stat: false,
        msg: 'No files',
      });
    } else {
      const { picture } = req.files;
      console.log(picture);
      console.log(picture.name);
      const fullPath = carImagePath + picture.name;
      picture.mv(`${fullPath}`);

      const sql = 'UPDATE auta SET image = ? WHERE spz = ?';
      db.query(sql, [fullPath, spz], (err, res) => {
        err && console.log(err);
      });

      res.send({
        stat: true,
        msg: 'File is uploaded',
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
//===================================

app.post('/register', (req, res) => {
  const { meno, heslo, email, telefon, username } = req.body;
  // console.log(req.body);
  let sql = 'SELECT * FROM user WHERE email=? OR username=?';
  let msg = '';
  db.query(sql, [email, username], (err, result) => {
    err && console.log(err);

    const dlzka = result.length;
    if (dlzka > 0) {
      console.log('tu');
      const { email: _email, username: _username } = result[0];
      email === _email && (msg = 'Email sa uz pouziva');
      username === _username && (msg = 'Login sa uz pouziva');
    } else {
      sql = 'INSERT INTO user (meno, heslo, email, telefon,username) VALUES (?,?,?,?,?)';
      db.query(sql, [meno, heslo, email, telefon, username], (err, result) => {
        if (err) {
          console.log(err);
        }
        msg = 'Registrácia prebehla úspešne!';
      });
    }
    res.send({ msg });
  });
});

app.post('/login', (req, res) => {
  const { heslo, username } = req.body;
  console.log(req.body);
  const sql = 'SELECT * FROM user WHERE username = ? ';
  db.query(sql, [username], (err, result) => {
    console.log(result);

    if (err) {
      console.log('error');
      console.log(err);
    } else {
      console.log('no eeror');

      let dlzka = result.length;
      console.log(dlzka);
      let stat = false;
      if (dlzka > 0) {
        console.log('dlzka');
        let newUser;
        console.log(heslo);
        console.log(result[0].heslo);
        if (heslo === result[0].heslo) {
          stat = true;
          newUser = { ...result[0], heslo: '' };
          res.send({ newUser, stat, msg: 'Uspesne' });
        } else {
          res.send({ stat, msg: 'Nespravne heslo' });
        }
      } else {
        res.send({ stat, msg: 'Nespravne meno' });
      }
    }
  });
});

app.post('/addCar', (req, res) => {
  const { znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka } = req.body;
  let msg = '';
  let stat = false;
  console.log(req.body);
  console.log(req.files);

  let sql;
  sql =
    'INSERT INTO auta (znacka, model, farba, spz, palivo, vykon, spotreba,cena,znamka) VALUES (?,?,?,?,?,?,?,?,?)';
  db.query(
    sql,
    [znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        msg = 'Auto pridané úspešne!';
        stat = true;
      }
      res.send({ msg, stat });
    }
  );
});

app.get('/getAuta', (req, res) => {
  const sql = 'SELECT * FROM auta';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
