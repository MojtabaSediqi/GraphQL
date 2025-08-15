import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import { apollo } from './apolloClient';

const container = document.querySelector('#root') as HTMLElement;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ApolloProvider client={apollo}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
