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
Object.defineProperty(exports, "__esModule", { value: true });
const LocationCreateValidation_1 = require("../middleware/validation/LocationCreateValidation");
const LocationService_1 = require("../services/LocationService");
const jwtCheck_1 = require("../helpers/jwtCheck");
const routes = require('express').Router();
routes.post('/', LocationCreateValidation_1.validateLocationCreateModel, jwtCheck_1.jwtCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const response = yield LocationService_1.createLocation(req.body);
        res.send(response[0]);
    }
    catch (e) {
        res.send(e);
    }
}));
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield LocationService_1.getAllLocations();
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}));
routes.get('/:locationId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield LocationService_1.getLocation(req.params['locationId']);
        res.send(response);
    }
    catch (e) {
        res.send(e);
    }
}));
exports.default = routes;
//# sourceMappingURL=LocationRoutes.js.map