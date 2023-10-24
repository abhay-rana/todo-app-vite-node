import PropTypes from 'prop-types';
import { memo } from 'react';

import ErrorBoundary from '~/components/container/error-boundary';

const Container = ({ children, is_login }) => {
    return (
        <ErrorBoundary>
            {!is_login ? (
                <>
                    {/* auth routes */}
                    {children}
                </>
            ) : (
                <>
                    {/* App routes */}
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
