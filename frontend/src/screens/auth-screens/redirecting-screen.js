import React, { memo, useEffect } from 'react';

const RedirectingScreen = () => {
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <div className="flex flex-row items-center justify-center">
            <div>RedirectingScreen....</div>
        </div>
    );
};

export default memo(RedirectingScreen);
