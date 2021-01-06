const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../database');

const carImagePath = './Public/Images/';
// const fileFath = './Public/Images/01fabia_small.png';
const deleteImage = (fileFath) => {
  console.log('DELETE OBR TU');
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

router.post('/add', (req, res) => {
  const { znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka, popis } = req.body;
  let msg = '';
  let stat = false;
  // console.log(req.body);
  // console.log(req.files);

  let sql;
  sql =
    'INSERT INTO auta (znacka, model, farba, spz, palivo, vykon, spotreba,cena,znamka,popis) VALUES (?,?,?,?,?,?,?,?,?,?)';
  db.query(
    sql,
    [znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka, popis],
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

router.get('/getAuta', async (req, res) => {
  const sql = 'SELECT * FROM auta';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

  //====cez async await
  // const data = await db.query(sql);
  // console.log(data[0]);
  // res.send(data[0]);
});

//!!! toto ide random potrebone await async
router.delete('/delete/:id', (req, res) => {
  console.log('DELETE AUTO');
  const id = req.params.id;
  console.log(id);
  let path = '';
  let sql = 'SELECT image FROM auta WHERE id = ?';
  console.log(sql);
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
    const dlzka = result.length;
    if (dlzka > 0) {
      console.log(result);
      path = result[0].image;
      // console.log(path);

      deleteImage(path);
    }

    sql = 'DELETE FROM auta WHERE id = ?';
    console.log(sql);
    db.query(sql, id, (err, result) => {
      if (err) console.log(err);
      res.send(`Úspešne zmazané auto s id: ${id}`);
    });
  });
});

router.put('/update', (req, res) => {
  const { znacka, model, farba, spz, palivo, vykon, spotreba, cena, znamka, id } = req.body;
  // console.log(req.body);
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
      } else {
        stat = true;
        msg = 'uprava úspešná';
        console.log('TU');
        console.log(result);
      }
      res.send({ stat, msg });
    }
  );
});

//======IMG=============

router.put('/update/picture/:spz?/:path?', (req, res) => {
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
      deleteImage(path);
      res.send({ stat, msg });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// app.post('/picture/:spz', (req, res) => {
//   const spz = req.params.spz;
//   // console.log(spz);
//   try {
//     if (!req.files) {
//       res.send({
//         stat: false,
//         msg: 'No files',
//       });
//     } else {
//       const { picture } = req.files;
//       console.log(picture);
//       console.log(picture.name);
//       const fullPath = carImagePath + picture.name;
//       picture.mv(`${fullPath}`);

//       const sql = 'INSERT INTO car_image (spz, path) VALUES (?,?)';
//       db.query(sql, [spz, fullPath], (err, res) => {
//         err && console.log(err);
//       });

//       res.send({
//         stat: true,
//         msg: 'File is uploaded',
//       });
//     }
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

module.exports = router;
