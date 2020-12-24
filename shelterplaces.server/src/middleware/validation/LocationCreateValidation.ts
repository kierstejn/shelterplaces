const validator = require('../../helpers/validate');

export const validateLocationCreateModel = (req: any, res: any, next: any) => {
    const validationRule = {
        "lat": "required|numeric",
        "lng": "required|numeric",
        "displayName": "string",
        "title": "required|string",
        "description": "string"
    };
    validator(req.body, validationRule, {}, (err: any, status: any) => {
        if (!status) {
            res.status(412)
                .send({
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

