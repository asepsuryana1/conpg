var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Pool} = require('pg')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'condb',
  password: 'kucing',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
