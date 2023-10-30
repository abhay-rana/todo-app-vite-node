import { useState } from 'react';
import { useLocation } from 'wouter';

import Button from '~/components/button/button';

import { postApi } from '~/services/api-services';

import Alertify from '~/scripts/alertify';

const SignupScreen = () => {
    const [_, setLocation] = useLocation();
    const [register, setRegisterValue] = useState({
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    });
    function setValue(key, value) {
        setRegisterValue({ ...register, [key]: value });
    }
    function singupUser() {
        if (register.password === register.confirm_password) {
            postApi('/signup', {
                username: register.username,
                email: register.email,
                password: register.password,
            })
                .then(() => {
                    Alertify.success('successfully user has been created');
                    setLocation('/login');
                })
                .catch();
        } else {
            Alertify.error('password are not same');
        }
    }
    return (
        <>
            <div className="flex h-screen flex-row items-center justify-center bg-red-100">
                <div className="flex flex-col gap-4">
                    <div>
                        <p className="text-18 text-warning">Signup Screen</p>
                    </div>
                    <input
                        type="username"
                        value={register.username}
                        placeholder="Enter username"
                        onChange={(event) =>
                            setValue('username', event.target.value)
                        }
                    />
                    <input
                        type="email"
                        value={register.email}
                        placeholder="Enter Email"
                        onChange={(event) =>
                            setValue('email', event.target.value)
                        }
                    />
                    <input
                        type="password"
                        value={register.password}
                        placeholder="Enter Password"
                        onChange={(event) =>
                            setValue('password', event.target.value)
                        }
                    />
                    <input
                        type="password"
                        value={register.confirm_password}
                        placeholder="Enter Confirm Password"
                        onChange={(event) =>
                            setValue('confirm_password', event.target.value)
                        }
                    />
                    <div>
                        <Button onClick={singupUser}>Signup</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupScreen;
