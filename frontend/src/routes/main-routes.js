import React from 'react';
import { Route, Router, Switch } from 'wouter';

import HomeScreen from '~/screens/main-screens/home-screen';
import uploadScreen from '~/screens/main-screens/upload-screen';

const ErrorScreen = React.lazy(() => import('~/components/container/404'));

const MainRoutes = () => {
    return (
        <Router>
            <React.Suspense fallback={<h1>Loading....</h1>}>
                <Switch>
                    <Route exact path="/home" component={HomeScreen} />
                    <Route exact path="/upload" component={uploadScreen} />

                    {/* if none of the route is matched */}
                    <Route component={ErrorScreen} />
                </Switch>
            </React.Suspense>
        </Router>
    );
};

export default MainRoutes;
