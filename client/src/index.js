import 'bulma/css/bulma.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from "@apollo/react-hooks";
import client from "./graphql/client";
import App from './App';

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    ,document.getElementById('root'));
