"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
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
const db = knex_1.default({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'cliffdivingsitesdev'
    }
});
exports.default = db;
//# sourceMappingURL=db.js.map