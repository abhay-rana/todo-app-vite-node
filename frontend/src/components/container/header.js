import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();

    function logout() {
        // dispatch(Logout());
    }

    return (
        <>
            <div className="flex flex-row justify-between p-6">
                <div>Logo</div>
                <div>Logout</div>
            </div>
        </>
    );
};

export default memo(Header);
