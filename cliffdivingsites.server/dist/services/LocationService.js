"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocation = void 0;
const db_1 = __importDefault(require("../data/db"));
exports.createLocation = (location) => {
    return db_1.default('location')
        .returning('id')
        .insert({
        user_id: '3d5905c9-9c80-4b7a-92c2-7cdb8d5a216b',
        lat: location.lat,
        lng: location.lng,
        display_name: location.displayName,
        title: location.title,
        description: location.description
    });
};
//# sourceMappingURL=LocationService.js.map