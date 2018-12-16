const mysql = require('mysql');

const connectionName = process.env.INSTANCE_CONNECTION_NAME || 'localhost:3306';
const dbUser = process.env.SQL_USER || 'root';
const dbPassword = process.env.SQL_PASSWORD || 'master';
const dbName = process.env.SQL_NAME || 'app';

const mysqlConfig = {
  connectionLimit: 1,
  user: dbUser,
  password: dbPassword,
  database: dbName
};

if (process.env.NODE_ENV === 'production') {
  mysqlConfig.socketPath = `/cloudsql/${connectionName}`;
}

let mysqlPool;
const getPool = (req, res) => {
    if (!mysqlPool) {
        mysqlPool = mysql.createPool(mysqlConfig);
    }
    return mysqlPool;
};

exports.executeQuery = (query = '', param = []) => {
    return new Promise((resolve, reject) => {
        let pool = getPool();
        pool.query(query, param, (err, result) => {
            if(err){
                console.log(`fail on execute query: ${err}, stringify: ${JSON.stringify(err)}`);
                reject(err);
            }
            resolve(result);
        })
    })
}