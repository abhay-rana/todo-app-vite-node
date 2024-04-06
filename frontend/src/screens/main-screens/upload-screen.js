import axios from 'axios';
// Import axios here
import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useCancelToken from '~/hook/useCancelToken';

import { GetTodos } from '~/redux/actions/todos-actions';

const UploadScreen = () => {
    const [show, setVisible] = useState(false);
    const [value, setValue] = useState('');
    return (
        <>
            <div>UploadScreen</div>

            <button
                className="bg-warning p-4 text-16"
                onClick={() => setVisible(!show)}
            >
                Toggle
            </button>
            <input value={value} onChange={(e) => setValue(e.target.value)} />

            {/* Prroduct Component */}
            {show && (
                <>
                    <Product search={value} />
                </>
            )}
        </>
    );
};

const Product = ({ search }) => {
    const dispatch = useDispatch();

    const { cancelToken, cancelRequest } = useCancelToken(); // Use the custom hook

    useEffect(() => {
        // Dispatch the action with cancelToken
        dispatch(GetTodos({ cancelToken, search }));
        // Cleanup function to cancel the request
        return () => {
            cancelRequest(); // Cancel the request when component unmounts
        };
    }, [search]);

    return (
        <>
            <div>This is product</div>
        </>
    );
};

export default memo(UploadScreen);
