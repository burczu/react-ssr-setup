import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from '../shared/App';
import Html from './components/HTML';

const serverRenderer = () => (req: any, res: any) => {
    const content = renderToString(
        <Router location={req.url} context={{}}>
            <App />
        </Router>
    );

    return res.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
