const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
// const saltRounds = 10;

const db = require('../database');

/*===VALIDACIA=== */
const validation = require('../Middlewares/validationMiddleware');
const loginSchema = require('../Validations/loginValidation');

/*===ROUTES=== */
// router.get('/', (req, res) => {
//    if (req.session.user) {
//       res.send({ loggedIn: true, user: req.session.user });
//    } else {
//       res.send({ loggedIn: false });
//    }
// });

router.post('/', validation(loginSchema), (req, res) => {
   const { heslo, username } = req.body;
   console.log(req.body);
   const sql = 'SELECT * FROM user WHERE username = ? ';

   db.query(sql, [username], (err, result) => {
      console.log(result);

      if (err) {
         console.log('error');
         console.log(err);
         return res.send({ err: err });
      } else {
         console.log('no eeror');

         let dlzka = result.length;
         console.log(dlzka);
         let stat = false;
         if (dlzka > 0) {
            console.log('dlzka');

            let newUser;
            bcrypt.compare(heslo, result[0].heslo, (error, response) => {
               if (response) {
                  stat = true;
                  newUser = { ...result[0], heslo: '' };
                  console.log('TU');
                  console.log(newUser);
                  // req.session.user = newUser;
                  // console.log(req.session.user);
                  //  return res.send({ newUser: newUser, stat: stat, msg: 'Uspesne' });
                  res.status(200).json({ newUser, stat, msg: 'Uspesne' });
                  return;
               } else {
                  console.log('TU2');
                  res.send({ stat, msg: 'Nespravne heslo' });
                  return;
               }
            });
         } else {
            console.log('TU3');
            res.send({ stat: stat, msg: 'Nespravne meno' });
            return;
         }
      }
   });
});

module.exports = router;

// router.post('/', (req, res) => {
//    const { heslo, username } = req.body;
//    console.log(req.body);
//    const sql = 'SELECT * FROM user WHERE username = ? ';
//    db.query(sql, [username], (err, result) => {
//       console.log(result);

//       if (err) {
//          console.log('error');
//          console.log(err);
//          return res.send({ txt: 'daco2' });
//       } else {
//          console.log('no eeror');

//          let dlzka = result.length;
//          console.log(dlzka);
//          let stat = false;
//          if (dlzka > 0) {
//             console.log('dlzka');
//             let newUser;
//             // console.log(heslo);
//             // console.log(result[0].heslo);
//             if (heslo === result[0].heslo) {
//                stat = true;
//                newUser = { ...result[0], heslo: '' };
//                console.log('TU');
//                console.log(newUser);
//                //  return res.send({ newUser: newUser, stat: stat, msg: 'Uspesne' });
//                res.status(200).json({ newUser, stat, msg: 'Uspesne' });
//                return;
//             } else {
//                console.log('TU2');
//                res.send({ stat, msg: 'Nespravne heslo' });
//                return;
//             }
//          } else {
//             console.log('TU3');
//             res.send({ stat: stat, msg: 'Nespravne meno' });
//             return;
//          }
//       }
//       // return res.send({ txt: 'daco' });
//    });
// });
