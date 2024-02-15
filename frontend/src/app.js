import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { AUTH_ROUTES } from '~/constant/routes-constant';
import useAppSelector from '~/hook/useAppSelector';

import AuthRoutes from '~/routes/auth-routes';
import MainRoutes from '~/routes/main-routes';

import Container from '~/components/container/container';

const App = () => {
    const [location, setLocation] = useLocation();
    const store = useAppSelector((state) => ({
        is_login: state.auth_store.is_login,
    }));

    useEffect(() => {
        if (store.is_login && AUTH_ROUTES.includes(location)) {
            setLocation('/home');
        }
    }, [store.is_login]);

    return (
        <>
            <Container is_login={store.is_login}>
                {!store.is_login ? <AuthRoutes /> : <MainRoutes />}
            </Container>
        </>
    );
};

export default App;
