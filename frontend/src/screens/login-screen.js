import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import { postApi } from '~/services/api-services';

import Button from '~/components/button/button';

import { userSignIn } from '~/redux/actions/auth-actions';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, setLocation] = useLocation();
    const dispatch = useDispatch();

    function setInputValue(key, value) {
        if (key === 'email') setEmail(value);
        else if (key === 'password') setPassword(value);
    }

    function handleLogin(type) {
        if (type === 'signup') {
            setLocation('/signup');
        } else if (type === 'login') {
            dispatch(userSignIn({ email, password })).then(() =>
                setLocation('/home')
            );
        }
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-red-50">
            <div>This is login screen</div>
            <div className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) =>
                        setInputValue('email', event.target.value)
                    }
                />
                <input
                    type="email"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) =>
                        setInputValue('password', event.target.value)
                    }
                />
            </div>
            <div className="flex flex-row gap-2">
                <Button onClick={() => handleLogin('login')}>Login</Button>
                <Button onClick={() => handleLogin('signup')}>Signup</Button>
            </div>
        </div>
    );
};

export default LoginScreen;
