import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserSignup } from '~/redux/actions/auth-actions';

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
                <button onClick={handleRegister}>Register</button>
            </div>
        </>
    );
};

export default SignupScreen;
