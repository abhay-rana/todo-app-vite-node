import { connect } from 'react-redux';

import AuthRoutes from '~/routes/auth-routes';
import Routes from '~/routes/routes';

import Container from '~/components/container/container';

const App = (props) => {
    return (
        <>
            <Container is_login={props.is_login}>
                {props.is_login ? <AuthRoutes /> : <Routes />}
            </Container>
        </>
    );
};

const mapStateToProps = (state) => ({
    is_login: state.auth_store.is_login,
});

export default connect(mapStateToProps, null)(App);
