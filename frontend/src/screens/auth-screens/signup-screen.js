import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserSignup } from '~/redux/actions/auth-actions';

import { ProjectUrl } from '~/env';

const SignupScreen = () => {
    const dispatch = useDispatch();
    const [cred, setCred] = useState({
        email: '',
        password: '',
        confirm_password: '',
    });
    function handleInputsChange(key, event) {
        setCred({ ...cred, [key]: event.target.value });
    }
    function handleRegister() {
        dispatch(UserSignup({ ...cred }));
    }
    function handleOAuth(type) {
        if (type === 'google') {
            window.location.href = `${ProjectUrl}/auth/google`; // Redirect to the '/google' endpoint on the server
        } else if (type === 'github') {
            window.location.href = `${ProjectUrl}/auth/github`; // Redirect to the '/github' endpoint on the server
        }
    }

    return (
        <>
            <div className="text-center text-18">Sign up screen</div>
            <div className="flex flex-col gap-4">
                <input
                    placeholder="Enter Email"
                    onChange={(e) => handleInputsChange('email', e)}
                    value={cred.email}
                />
                <input
                    placeholder="Enter password"
                    onChange={(e) => handleInputsChange('password', e)}
                    value={cred.password}
                />
                <input
                    placeholder="Enter set-password"
                    onChange={(e) => handleInputsChange('confirm_password', e)}
                    value={cred.confirm_password}
                />
                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleRegister}
                        className="border bg-green-300 p-4"
                    >
                        Register
                    </button>
                    <button
                        onClick={() => handleOAuth('google')}
                        className="border bg-red-300 p-4"
                    >
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => handleOAuth('github')}
                        className="border bg-yellow-300 p-4"
                    >
                        Sign in with Github
                    </button>
                </div>
            </div>
        </>
    );
};

export default SignupScreen;
