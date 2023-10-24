import { connect } from 'react-redux';

import Routes from '~/routes/routes';

import Container from '~/components/container/container';

const App = (props) => {
    return (
        <>
            <Container>
                <Routes />
            </Container>
        </>
    );
};

export default connect(mapStateToProps, null)(App);
