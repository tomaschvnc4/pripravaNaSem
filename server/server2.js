const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const bodyParser = require('body-parser');
const { ifError } = require('assert');

const app = express();

//****img */
app.use(express.static('Public'));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

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

const carImagePath = './Public/Images/';
// const fileFath = './Public/Images/01fabia_small.png';
const deleteImage = (fileFath) => {
  console.log('DELETE TU');
  console.log(fileFath);
  fs.stat(fileFath, function (err, stats) {
    console.log(stats); //here we got all information of file in stats variable

    if (err) {
      return console.error(err);
    }

    fs.unlink(fileFath, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
  });
};

const basicSelect = async (table = '', whatIWant = '', whereKey = '', paramWhere = '') => {
  if (!table) return 'missing params';

  whatIWant = whatIWant || '*';
  if (!!whereKey && !paramWhere) return 'missing param'; //ak mam where key ale nemam hodnotu"

  const sqlWhere = whereKey === '' ? '' : `WHERE ${whereKey} = ?`;
  const sql = `SELECT ${whatIWant} FROM ${table} ${sqlWhere}`;
  console.log(sql);
  db.query(sql, paramWhere, (err, result) => {
    err && console.log(err);
    console.log('tu2');
    console.log(result);
    return result[0][whatIWant];
  });
  console.log('tu3');
};
//****img */

// ==========================================

app.get('/test', async (req, res) => {
  const tmp = await basicSelect('auta', 'image', 'id', 30);
  console.log('tu');
  console.log(tmp);
  // res.send('test');
  res.send(tmp);
  // deleteImage();
});

//======IMG=============
app.post('/picture/:spz', (req, res) => {
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
app.put('/update/picture/:spz?/:path?', (req, res) => {
  let { path, spz } = req.params;
  console.log(req.params);
  console.log(path);
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
      const fullPath = carImagePath + spz + '_' + picture.name;
      picture.mv(`${fullPath}`);

      const sql = 'UPDATE auta SET image = ? WHERE spz = ?';
      db.query(sql, [fullPath, spz], (err, res) => {
        err && console.log(err);
      });

      res.send({
        stat: true,
        msg: 'File is uploaded',
      });
      path = carImagePath + path;
      console.log('!!!!!path');
      console.log(path);
      deleteImage(path);
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
        console.log(err.errno);
        if (err.errno === 1062) {
          msg = 'Auto s takouto SPZ už exituje';
        }
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

app.delete('/delete/car/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  let path = '';
  let sql = 'SELECT image FROM auta WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
    const dlzka = result.length;
    if (dlzka > 0) {
      console.log(result);
      path = result[0].image;
      console.log(path);

      deleteImage(path);
    }

    sql = 'DELETE FROM auta WHERE id = ?';
    db.query(sql, id, (err2, result2) => {
      if (err) return console.log(err);
      res.send(`Úspešne zmazané auto s id: ${id}`);
    });
  });
});

app.put('/update/car', (req, res) => {
  const { znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka, id } = req.body;
  console.log(req.body);
  let msg = '';
  let stat = false;
  let sql =
    'UPDATE auta SET znacka = ?, model = ?, farba = ?, spz = ?, palivo = ?, vykon = ?, spotreba = ?, cena = ?, znamka = ? WHERE id = ?';
  db.query(
    sql,
    [znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka, id],
    (err, result) => {
      if (err) {
        console.log(err);
        stat = false;
      } else {
        stat = true;
        msq = 'uprava úspešná';
        console.log('TU');
        console.log(result);
      }
      res.send({ stat, msg });
    }
  );
});
