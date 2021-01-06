const express = require('express');
const router = express.Router();

const db = require('../database');

router.post('/', (req, res) => {
  const { heslo, username } = req.body;
  // console.log(req.body);
  const sql = 'SELECT * FROM user WHERE username = ? ';
  db.query(sql, [username], (err, result) => {
    // console.log(result);

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
        // console.log(heslo);
        // console.log(result[0].heslo);
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

module.exports = router;
