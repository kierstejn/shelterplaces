"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Routes
const LocationRoutes_1 = __importDefault(require("./routes/LocationRoutes"));
let bodyParser = require('body-parser');
let cors = require('cors');
const server = express_1.default();
const port = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());
server.use('/location', LocationRoutes_1.default);
// @ts-ignore
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map