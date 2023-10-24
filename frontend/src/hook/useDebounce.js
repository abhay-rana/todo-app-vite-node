import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = (callback) => {
    const reference = useRef();

    useEffect(() => {
        reference.current = callback;
    }, [callback]);

    const debouncedCallback = useMemo(() => {
        const function_ = () => {
            reference.current?.();
        };

        return debounce(function_, 1000);
    }, []);

    return debouncedCallback;
};

//! Example

// const Input = () => {
//     const [value, setValue] = useState();

//     const debouncedRequest = useDebounce(() => {
//         //! send request to the backend
//         //! access to latest state here
//*         console.log(value);
//     });

//     const onChange = (e) => {
//         const value = e.target.value;
//         setValue(value);

//         debouncedRequest();
//     };

//     return <input onChange={onChange} value={value} />;
// };
