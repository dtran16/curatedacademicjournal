import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

//styles
import './styles/index.css';

//components
import App from './App';
import Landing from './containers/landing';
import ArticleProfile from './containers/articleProfile';
import PaperForm from './containers/paperForm'
import PaperUpload from './containers/upload';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
