let db_params = require('../auth/db_params.json');

const promise = require('bluebird');
const initOptions = {
    promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);
const db = pgp({
  user: db_params["postgresql"]["user"],
  host: db_params["postgresql"]["host"],
  database: db_params["postgresql"]["db"],
  password: db_params["postgresql"]["password"],
  port: db_params["postgresql"]["port"]
});

module.exports = db;
