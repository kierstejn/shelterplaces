"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLocationCreateModel = void 0;
const validator = require('../../helpers/validate');
exports.validateLocationCreateModel = (req, res, next) => {
    const validationRule = {
        "lat": "required|numeric",
        "lng": "required|numeric",
        "displayName": "string",
        "title": "required|string",
        "description": "string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                message: 'Validation failed',
                data: err
            });
        }
        else {
            next();
        }
    });
};
//# sourceMappingURL=LocationCreateValidation.js.map