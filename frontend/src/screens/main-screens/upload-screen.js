import React, { memo, useEffect, useState } from 'react';

import { cancelOngoingRequests, getApi } from '~/services/api-services';

const UploadScreen = () => {
    const [show, setVisible] = useState(false);
    return (
        <>
            <div>UploadScreen</div>

            <button
                className="bg-warning p-4 text-16"
                onClick={() => setVisible(!show)}
            >
                Toggle
            </button>

            {/* Prroduct Component */}
            {show && (
                <>
                    <Product />
                </>
            )}
        </>
    );
};

const Product = () => {
    useEffect(() => {
        async function getDetails() {
            const { data } = await getApi(`/todos`);
            console.group({ data });
            return { data };
        }
        getDetails();
        return () => {
            console.log('unmount the components');
            cancelOngoingRequests();
        };
    }, []);

    return (
        <>
            <div>This is product</div>
        </>
    );
};

export default memo(UploadScreen);
