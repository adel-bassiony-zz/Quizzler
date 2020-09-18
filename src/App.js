import React, {Suspense} from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Loader from './components/Loader/Loader';
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary';

function App() {
    return (
        <>
            <Helmet>
                <title>Quizzler</title>
            </Helmet>

            <ErrorBoundary>
                <Router>
                    <Suspense fallback={<Loader/>}>
                        {Routes}
                    </Suspense>
                </Router>
            </ErrorBoundary>
        </>
    );
}

export default App;
