import { Route, Router, Switch } from 'wouter';

import LoginScreen from '~/screens/auth-screens/login-screen';
import SignupScreen from '~/screens/auth-screens/signup-screen';

// import LoginScreen from '~/screens/login-screen';
// import SignupScreen from '~/screens/signup-screen';
import ErrorScreen from '~/components/container/404';

const AuthRoutes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/signup" component={SignupScreen} />
                    {/*
                    
                    <Route
                        path="/reset-password"
                        component={ResetPasswordScreen}
                    />
                    <Route
                        path="/set-password"
                        component={ResetPasswordScreen}
                    />
                    <Route
                        path="/forgot-password"
                        component={ResetPasswordScreen}
                    /> */}
                    <Route component={ErrorScreen} />
                </Switch>
            </Router>
        </>
    );
};

export default AuthRoutes;
