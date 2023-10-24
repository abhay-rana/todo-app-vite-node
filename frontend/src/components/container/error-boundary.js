import PropTypes from 'prop-types';
import React, { Component } from 'react';

// import NoData from '~/components/mobile/common/no-data';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                // <NoData
                //     title="Oops..."
                //     sub_title="Sorry, Something went wrong. Try again"
                //     src="https://static.oxinis.com/healthmug/image/healthmug/error.webp"
                // />
                <div>Error in App</div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};
