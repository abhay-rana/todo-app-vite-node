import React from 'react';
import { Route, Router, Switch } from 'wouter';

const HomeScreen = React.lazy(() => import('~/screens/home-screen'));
const ChangePasswordScreen = React.lazy(() =>
    import('~/screens/change-password-screen')
);
const ErrorScreen = React.lazy(() => import('~/components/container/404'));

const Routes = () => {
    return (
        <Router>
            <React.Suspense fallback={<h1>Loading....</h1>}>
                <Switch>
                    <Route exact path="/home" component={HomeScreen} />
                    <Route
                        exact
                        path="/change-password"
                        component={ChangePasswordScreen}
                    />

                    {/* if none of the route is matched */}
                    <Route component={ErrorScreen} />
                </Switch>
            </React.Suspense>
        </Router>
    );
};

export default Routes;
