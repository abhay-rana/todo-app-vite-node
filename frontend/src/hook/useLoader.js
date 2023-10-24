import { useState } from 'react';

export const useLoader = (initial_state) => {
    const [loader, setLoader] = useState(initial_state);

    const startLoader = () => setLoader(true);
    const endLoader = () => setLoader(false);

    return [loader, startLoader, endLoader];
};
