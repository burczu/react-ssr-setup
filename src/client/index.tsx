import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../shared/App';

hydrate(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
    const anyModule = module as any;
    if (anyModule.hot) {
        anyModule.hot.accept();
    }
}
