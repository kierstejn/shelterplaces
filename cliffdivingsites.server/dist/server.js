"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LocationService_1 = require("./services/LocationService");
const LocationCreateValidation_1 = require("./middleware/validation/LocationCreateValidation");
let bodyParser = require('body-parser');
let cors = require('cors');
const server = express_1.default();
const port = process.env.PORT || 5000;
server.use(cors());
server.use(bodyParser.json());
server.get('/', (req, res) => {
    res.send("hello");
});
server.post('/sites', LocationCreateValidation_1.validateLocationCreateModel, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield LocationService_1.createLocation(req.body);
        res.send(response[0]);
    }
    catch (e) {
        res.send(e);
    }
}));
// @ts-ignore
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map