import PropTypes from 'prop-types';
import { memo } from 'react';

import ErrorBoundary from '~/components/container/error-boundary';

const Container = ({ children }) => {
    return (
        <ErrorBoundary>
            {/* <Header /> */}
            {/* <Sidebar /> */}
            {children}
            {/* <Footer /> */}
        </ErrorBoundary>
    );
};

export default memo(Container);

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
