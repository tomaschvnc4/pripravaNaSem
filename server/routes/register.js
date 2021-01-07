const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../database');

/*===VALIDACIA=== */

const validation = require('../Middlewares/validationMiddleware');
const registerSchema = require('../Validations/registerValidation');

/*===ROUTES=== */
router.post('/', validation(registerSchema), (req, res) => {
   const { meno, heslo, email, telefon, username } = req.body;
   // console.log(req.body);
   let sql = 'SELECT * FROM user WHERE email=? OR username=?';
   let msg = '';
   let stat = false;

   bcrypt.hash(heslo, saltRounds, (err, hash) => {
      if (err) {
         console.log(err);
      } else {
         db.query(sql, [email, username], (err, result) => {
            err && console.log(err);

            const dlzka = result.length;
            console.log(dlzka);
            if (dlzka > 0) {
               const { email: _email, username: _username } = result[0];
               email === _email && (msg = 'Email sa uz pouziva');
               username === _username && (msg = 'Login sa uz pouziva');
            } else {
               stat = true; ///!!!!len aby prislo daco ale necaka to ci ozaj sa vlozilo
               msg = msg || 'Registrácia prebehla úspešne!';
               sql = 'INSERT INTO user (meno, heslo, email, telefon,username) VALUES (?,?,?,?,?)';
               console.log('REGISTER');
               console.log(hash);
               db.query(sql, [meno, hash, email, telefon, username], (err2, result2) => {
                  if (err2) {
                     console.log(err2);
                     msg = 'Err:500 chyba pri registraci';
                  } else {
                     stat = true;
                     msg = 'Registrácia prebehla úspešne!';
                  }
                  console.log(msg);
                  // res.send({ msg: msg, stat: stat });
               });
            }
            //neposle mi to "Registrácia prebehla úspešne!'" lebo await nefunguje cize nepocka
            res.send({ msg: msg, stat: stat });
         });
      }
   });
});

module.exports = router;

// router.post('/', validation(registerSchema), (req, res) => {
//    const { meno, heslo, email, telefon, username } = req.body;
//    // console.log(req.body);
//    let sql = 'SELECT * FROM user WHERE email=? OR username=?';
//    let msg = '';
//    let stat = false;

//    bcrypt.hash(heslo, saltRounds, (err, hash));

//    db.query(sql, [email, username], (err, result) => {
//       err && console.log(err);

//       const dlzka = result.length;
//       console.log(dlzka);
//       if (dlzka > 0) {
//          const { email: _email, username: _username } = result[0];
//          email === _email && (msg = 'Email sa uz pouziva');
//          username === _username && (msg = 'Login sa uz pouziva');
//       } else {
//          stat = true; ///!!!!len aby prislo daco ale necaka to ci ozaj sa vlozilo
//          msg = msg || 'Registrácia prebehla úspešne!';
//          sql = 'INSERT INTO user (meno, heslo, email, telefon,username) VALUES (?,?,?,?,?)';
//          console.log('REGISTER');
//          db.query(sql, [meno, heslo, email, telefon, username], (err2, result2) => {
//             if (err2) {
//                console.log(err2);
//                msg = 'Err:500 chyba pri registraci';
//             } else {
//                stat = true;
//                msg = 'Registrácia prebehla úspešne!';
//             }
//             console.log(msg);
//             // res.send({ msg: msg, stat: stat });
//          });
//       }
//       //neposle mi to "Registrácia prebehla úspešne!'" lebo await nefunguje cize nepocka
//       res.send({ msg: msg, stat: stat });
//    });
// });
