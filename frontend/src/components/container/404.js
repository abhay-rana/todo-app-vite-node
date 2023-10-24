import React, { memo } from 'react';

const ErrorScreen = () => {
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                {' '}
                404 Page Not Found
            </div>
        </>
    );
};

export default memo(ErrorScreen);
