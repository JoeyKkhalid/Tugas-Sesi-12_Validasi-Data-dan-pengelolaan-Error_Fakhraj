const express = require('express');
const { body, validationResult } = require('express-validator');
const Joi = require('joi');

const app = express();
const port = 5000;

app.use(express.json());

const validateInput = [
    body('username').isLength({ min: 5}).withMessage('panjang username minimal 5 karakter'),
    body('email').isEmail().withMessage('Format email tidak sesuai'),
];

const validateInputJoi = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    next();
};

app.post('/user',validateInput, (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    res.json({ message: 'data user valid!'});
});

app.post('/user-joi', validateInput, (req, res) => {
    res,json({ message: 'data user valid!'});
});

app.listen(port, ()=> {
    console.log(`sever berjalan di http://localhost:${port}`);
});