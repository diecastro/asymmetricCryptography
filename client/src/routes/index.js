import React from 'react';
import { Route, Redirect } from 'react-router';

import Layout from '../components/Layout/LayoutContainer';
import routes from '../constants/routes';

const appRoutePrefix = routes.home;

export default (
    <Route path={appRoutePrefix} component={Layout}>
    </Route>
);
