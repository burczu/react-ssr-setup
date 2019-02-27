/* eslint-disable react/no-danger */
import React from 'react';

interface IProps {
    children: any,
    css: string[],
    scripts: string[],
    state: string,
}

export default class HTML extends React.Component<IProps> {
    public static defaultProps = {
        css: [],
        scripts: [],
        state: '{}',
    };

    public render() {
        const { children, scripts, css, state } = this.props;
        return (
            <html lang="">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Test</title>
                    {css.map((href) => {
                        return <link key={href} rel="stylesheet" href={href} />;
                    })}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.__PRELOADED_STATE__ = ${state}`,
                        }}
                    />
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                    {scripts.map((src) => {
                        return <script key={src} src={src} />;
                    })}
                </body>
            </html>
        );
    }
}
