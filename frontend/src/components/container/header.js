import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import { Logout } from '~/redux/actions/auth-actions';

const Header = () => {
    const dispatch = useDispatch();
    const [location, setLocation] = useLocation();

    function logout() {
        dispatch(Logout()).then(() => setLocation('/login'));
    }

    function changePassword() {
        setLocation('/change-password');
    }

    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <div>
                    <button onClick={() => setLocation('/home')}>Logo</button>
                </div>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={changePassword}
                        className="bg-blue-300 p-2"
                    >
                        Change Password
                    </button>
                    <button onClick={logout} className="bg-warning p-2">
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default memo(Header);
