import { Route, Router, Switch } from 'wouter';

import LoginScreen from '~/screens/login-screen';
import SignupScreen from '~/screens/signup-screen';

const AuthRoutes = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/signup" component={SignupScreen} />
                </Switch>
            </Router>
        </>
    );
};

export default AuthRoutes;
