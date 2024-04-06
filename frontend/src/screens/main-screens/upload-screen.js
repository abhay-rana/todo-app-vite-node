import axios from 'axios';
// Import axios here
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useCancelToken from '~/hook/useCancelToken';

import { GetTodos } from '~/redux/actions/todos-actions';

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
    const dispatch = useDispatch();

    const { cancelToken, cancelRequest } = useCancelToken(); // Use the custom hook

    useEffect(() => {
        // Dispatch the action with cancelToken
        dispatch(GetTodos({ cancelToken }));
        // Cleanup function to cancel the request
        return () => {
            cancelRequest(); // Cancel the request when component unmounts
        };
    }, []);

    return (
        <>
            <div>This is product</div>
        </>
    );
};

export default memo(UploadScreen);
