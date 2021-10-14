import { Pool } from "pg";
const pool = new Pool ({
    host: 'localhost',
    port: '5432',
    user: 'grupo13',
    password: 'misiontic',
    database: 'nailspa'
});

module.exports = pool;