import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import { SetToken } from '~/redux/slices/auth-reducer';

//! In this page user comes from the callback redirection from the backend on the successfull token completion

const RedirectingScreen = () => {
    const dispatch = useDispatch();
    const [location, setLocation] = useLocation();
    useEffect(() => {
        // get the token form the url
        // save the token and the is_login as true
        // now redirect it to the home screen
        // Function to extract token from URL
        const getTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            return token;
        };

        // Get token from URL
        const token = getTokenFromUrl();

        // Store token securely (e.g., in localStorage)
        dispatch(SetToken({ token }));
        if (!!token) {
            setTimeout(() => {
                setLocation('/home');
            }, 0);
        }

        return () => {};
    }, []);

    return (
        <div className="flex flex-row items-center justify-center">
            <div>RedirectingScreen....</div>
        </div>
    );
};

export default memo(RedirectingScreen);
