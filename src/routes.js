import React, {lazy} from 'react';
import { Route, Switch } from 'react-router-dom';

// Application Routes
const Routes = (
    <Switch>
        <Route path="/" exact component={<h1>Home Page</h1>} />
    </Switch>
);

export default Routes;
