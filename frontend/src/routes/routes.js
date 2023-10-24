import React from 'react';
import { Route, Router, Switch } from 'wouter';

import DebounceScreen from '~/screens/debounce-screen';

const HomeScreen = React.lazy(() => import('~/screens/home-screen'));
const AboutScreen = React.lazy(() => import('~/screens/about-screen'));
const ErrorScreen = React.lazy(() => import('~/components/container/404'));
const ContactScreen = React.lazy(() => import('~/screens/contact-screen'));

const Routes = () => {
    return (
        <Router>
            <React.Suspense fallback={<h1>Loading....</h1>}>
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    
                    {/* if none of the route is matched */}
                    <Route component={ErrorScreen} />
                </Switch>
            </React.Suspense>
        </Router>
    );
};

export default Routes;
