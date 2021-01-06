const express = require('express');
const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'tomas',
  password: 'tomas',
  database: 'cruddb1',
  // connectionLimit: 10,
});

module.exports = db;
