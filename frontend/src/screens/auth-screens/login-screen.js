import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserSignIn } from '~/redux/actions/auth-actions';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [cred, setCred] = useState({
        email: '',
        password: '',
    });
    function handleSignIn() {
        dispatch(UserSignIn({ email: cred.email, password: cred.password }));
    }
    return (
        <>
            <div>Login screen</div>
            <div className="flex flex-col gap-2">
                <input
                    className="border border-danger"
                    value={cred.email}
                    onChange={(e) =>
                        setCred({ ...cred, email: e.target.value })
                    }
                    placeholder="Enter Email"
                />
                <input
                    className="border border-danger"
                    value={cred.password}
                    onChange={(e) =>
                        setCred({ ...cred, password: e.target.value })
                    }
                    placeholder="Enter password"
                />
                <button className="bg-warning p-4" onClick={handleSignIn}>
                    Sign in
                </button>
            </div>
        </>
    );
};

export default LoginScreen;
