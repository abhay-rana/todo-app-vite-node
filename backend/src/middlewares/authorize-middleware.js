import jwt from 'jsonwebtoken';
import { JWT_REFRESH_TOKEN, JWT_TOKEN } from '../../env.js';

export async function Authorize(req, res, next) {
    try {
        const token = req.get('authorization');
        console.log('token', token);
        if (!token) {
            return res.status(401).send('There is no token.');
        }
        console.log('refresh', req.originalUrl);
        const jwtSecret = req.originalUrl.includes('refresh')
            ? JWT_REFRESH_TOKEN
            : JWT_TOKEN;
        jwt.verify(token.split(' ')[1], jwtSecret, (err, user) => {
            console.log('error', err?.message);
            if (err && err?.message === 'jwt expired')
                return res.status(403).send('Token expired');
            if (err) return res.status(401).send('Invalid Token');
            req.user = user;
            next();
        });
    } catch (err) {
        console.error('Authorization Error:', err);
        return res.status(401).json({ success: false, msg: err.message });
    }
}
