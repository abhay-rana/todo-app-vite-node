import React from 'react';
import { Route, Router, Switch } from 'wouter';

import HomeScreen from '~/screens/main-screens/home-screen';
import uploadScreen from '~/screens/main-screens/upload-screen';

const MainRoutes = () => {
    return (
        <>
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/upload" component={uploadScreen} />
        </>
    );
};

export default MainRoutes;
