const express = require('express');
const router = express.Router();

const db = require('../database');

router.post('/add', (req, res) => {
  const { id_auto, id_zakaznik, d_rezervacie } = req.body;
  // console.log(req.body);
  let stat = false;
  let msg = '';
  const sql = 'INSERT INTO vypozicky (id_auto, id_zakaznik, d_rezervacie) VALUES (?, ?, ?)';
  db.query(sql, [id_auto, id_zakaznik, d_rezervacie], (err, result) => {
    if (err) {
      console.log(err);
      msg = 'Chyba';
    } else {
      stat = true;
      msg = 'Rezervácia úspešne vytvorená';
    }
    res.send({ stat, msg });
  });
});

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  let stat = false;
  let msg = '';
  const sql = 'DELETE FROM vypozicky WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
      msg = 'Chyba';
    } else {
      stat = true;
      msg = 'Zmazanie úspešné';
    }
    res.send({ stat, msg });
  });
});

router.get('/pozicaneID', (req, res) => {
  let stat = false;
  let msg = '';
  const sql = 'SELECT id_auto FROM vypozicky WHERE d_pozicane IS NULL OR d_vratene IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      msg = 'Chyba vyberu id pozicanych aut';
    } else {
      stat = true;
      msg = 'Vyber ID auta, kt. je pozicane úspešné';
      console.log(result);
    }
    res.send({ result, stat, msg });
  });
});

router.put('/update/:column?/:value?/:id?', (req, res) => {
  const { column, value, id } = req.params;
  console.log('UPDATE/vypozicka');
  console.log(req.params);
  let stat = false;
  let msg = '';
  const sql = `UPDATE vypozicky SET ${column} = ? WHERE id = ?`;
  console.log(sql);
  db.query(sql, [value, id], (err, ress) => {
    if (err) {
      console.log(err);
      msg = 'Chyba';
    } else {
      stat = true;
      msg = 'Upravené úspešné';
    }
    res.send({ stat, msg });
  });
});

//potom poriesim ci admin alebo nie inak
router.get('/get/:isAdmin?/:id?', (req, res) => {
  let { isAdmin, id } = req.params;
  let stat = false;
  let msg = '';
  let sql = '';
  isAdmin = isAdmin === 'true';
  console.log(isAdmin);
  // console.log(req.params);
  if (isAdmin) {
    sql =
      'SELECT * FROM (SELECT meno, id FROM user) AS tmp JOIN vypozicky ON vypozicky.id_zakaznik = tmp.id';
  } else {
    sql =
      'SELECT * FROM (SELECT meno, id FROM USER WHERE id = ?) AS tmp JOIN vypozicky ON vypozicky.`id_zakaznik`=tmp.`id`';
  }
  console.log(sql);
  db.query(sql, [id && id], (err, result) => {
    if (err) {
      console.log(err);
      msg = 'Chyba';
    } else {
      stat = true;
      msg = 'Žiadosť úspešná';
    }
    console.log(result);
    res.send({ result, stat, msg });
  });
});

module.exports = router;
