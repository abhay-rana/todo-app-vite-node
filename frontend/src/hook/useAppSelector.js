import { shallowEqual, useSelector } from 'react-redux';

const useAppSelector = (selector) => {
    // Get the selector result using the useSelector hook
    const selectedData = useSelector(selector, shallowEqual);

    return selectedData;
};

export default useAppSelector;
