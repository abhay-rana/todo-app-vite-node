import { useState } from 'react';

import Button from '~/components/button/button';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function setInputValue(key, value) {
        if (key === 'email') setEmail(value);
        else if (key === 'password') setPassword(value);
    }

    function handleLogin() {}

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
            <div>
                <Button onClick={handleLogin}>Login</Button>
            </div>
        </div>
    );
};

export default LoginScreen;
