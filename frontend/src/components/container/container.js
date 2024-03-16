import PropTypes from 'prop-types';
import { memo } from 'react';

import ErrorBoundary from '~/components/container/error-boundary';
import Header from '~/components/container/header';

const Container = ({ children, is_login }) => {
    return (
        <ErrorBoundary>
            {!is_login ? (
                <>
                    {/* auth routes */}
                    <Header />
                    {children}
                    <Footer />
                </>
            ) : (
                <>
                    {/* App routes */}
                    <Sidebar />
                    {children}
                </>
            )}
        </ErrorBoundary>
    );
};

export default memo(Container);

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
