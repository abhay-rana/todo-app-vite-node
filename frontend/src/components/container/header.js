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

    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <div>Logo</div>
                <button onClick={logout} className="bg-warning p-4 text-18">
                    Logout
                </button>
            </div>
        </>
    );
};

export default memo(Header);
