import React, {lazy} from 'react';
import { Route, Switch } from 'react-router-dom';

// Lazy Components
const Home = lazy(() => import('./components/Home/Home'));
const Account = lazy(() => import('./components/Account/Account'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const SetupQuiz = lazy(() => import('./components/SetupQuiz/SetupQuiz'));
const Quiz = lazy(() => import('./components/Quiz/Quiz'));

// Application Routes
const Routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/account" exact component={Account} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/start" exact component={SetupQuiz} />
        <Route path="/quiz" exact component={Quiz} />
    </Switch>
);

export default Routes;
