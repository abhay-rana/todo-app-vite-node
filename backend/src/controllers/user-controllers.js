import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDb } from '../models/user-schema.js';
import { JWT_REFRESH_TOKEN, JWT_TOKEN } from '../../env.js';

export async function SignupUser(req, res) {
    try {
        const { username, password, confirm_password, email } = req.body;
        if (password === confirm_password) {
            console.log('hello', { username, password });
            const hash_password = await bcrypt.hash(password, 10);
            UserDb.create({ username, email, password: hash_password });
            return res.json({
                message: 'user is created',
            });
        } else {
            return res.status(401).json({
                message: 'Wrong Password',
            });
        }
    } catch (error) {
        console.error('error', error);
    }
}

export async function LoginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserDb.findOne({ email });
        console.log('user', user);
        if (!user) {
            res.status(501).json({
                message: 'user not found',
            });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({
                    message: err || 'Wrong Password',
                });
            } else {
                // const token=jwt.sign({id:user._id,username:user.username},JWT_TOKEN,{expiresIn: "30s"});
                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    JWT_TOKEN,
                    { expiresIn: '1d' }
                );
                // const refresh_token=jwt.sign({id:user._id,username:user.username},JWT_REFRESH_TOKEN,{expiresIn: "1m"});
                const refresh_token = jwt.sign(
                    { id: user._id, username: user.username },
                    JWT_REFRESH_TOKEN,
                    { expiresIn: '5d' }
                );
                const { password, ...restParams } = user._doc;
                return res
                    .status(201)
                    .json({ user: restParams, token, refresh_token });
            }
        });
    } catch (err) {
        console.log('Error Login:', err);
    }
}

export async function GenerateNewAccessToken(req, res) {
    try {
        const { user } = req;
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_TOKEN,
            { expiresIn: '5m' }
        );
        return res.status(201).send(token);
    } catch (err) {
        console.error('Generate Access Token:', err);
    }
}

export async function ChangePassword(req, res) {
    try {
        console.log('change passowrd hits api');
        const { user } = req;
        const id = user.id;
        console.log('user', id);
        const { password, confirm_password, old_password } = req.body;
        console.log({
            password,
            confirm_password,
            old_password,
        });
        if (password === confirm_password) {
            console.log('entere here');
            const user = await UserDb.findById(id);
            bcrypt.compare(old_password, user.password, async (err, result) => {
                if (err || !result) {
                    return res.status(401).json({
                        message: err || 'Wrong Password',
                    });
                } else {
                    const hash_password = await bcrypt.hash(password, 10);
                    await UserDb.findByIdAndUpdate(user.id, {
                        password: hash_password,
                    });
                    res.json({
                        message: 'Password changes successfully',
                    });
                }
            });
        } else {
            res.status(501).json({
                message: 'Password and confirm password are not matched',
            });
        }
    } catch (error) {
        console.error('error', error);
    }
}

export async function LogoutUser(req, res) {
    try {
        req.session = null;
        res.json({
            message: 'You are successfully logout',
        });
    } catch (err) {
        console.log('=------>', err);
    }
}
