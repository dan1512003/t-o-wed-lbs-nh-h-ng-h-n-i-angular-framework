const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",           
    host: "localhost",         
    database: "lbs_hanoi",    
    password: "leedahee0315",        
    port: 1513,                 
});

module.exports = pool;
