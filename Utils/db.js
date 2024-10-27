const mysql = require('mysql2');

const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const database= process.env.MYSQL_DATABASE;

const pool = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    connectionLimit: 10,
    queueLimit: 0
})

const knex = require('knex')({
    client: 'mysql',
    connection:{
        host: host,
        port: port,
        user: user,
        password: password,
        database: database
    },
    pool: {min: 0, max:10},
    migrations: {
        tableName: 'migrations'
    }
})

module.exports = pool.promise();
