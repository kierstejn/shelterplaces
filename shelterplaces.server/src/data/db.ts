import knex from 'knex'
import fs from 'fs'

// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false,
//             ca: fs.readFileSync('server.crt').toString(),
//             key: fs.readFileSync('server.key').toString(),
//             cert: fs.readFileSync('server.crt').toString(),
//         },
//
//     }
// });

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : '',
        password : '',
        database : 'cliffdivingsitesdev'
    }
});

export default db;