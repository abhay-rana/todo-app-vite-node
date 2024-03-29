import { Route, Router, Switch } from 'wouter';

import LoginScreen from '~/screens/auth-screens/login-screen';
import RedirectingScreen from '~/screens/auth-screens/redirecting-screen';
import SignupScreen from '~/screens/auth-screens/signup-screen';

// import LoginScreen from '~/screens/login-screen';
// import SignupScreen from '~/screens/signup-screen';
import ErrorScreen from '~/components/container/404';

const AuthRoutes = () => {
    return (
        <>
            <Route path="/login" component={LoginScreen} />
            <Route path="/signup" component={SignupScreen} />
            <Route path="/oauth-redirecting" component={RedirectingScreen} />
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
        </>
    );
};

export default AuthRoutes;
