import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { checkIfTokenExists } from '../config/db.js';

config();
export const auth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ').at(-1);
    if (!token) return res.status(401).json({message: 'Unauthenticated.'});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, async (err, user) => {
        if (err) return res.status(401).json({message: 'Unauthenticated.'});
        if (!await checkIfTokenExists(user.ID)) return res.status(401).json({message: 'Unauthenticated.'});
        req.user = user;
        next();
    })
}