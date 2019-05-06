import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Landing from './containers/landing';
import ArticleProfile from './containers/articleProfile';
import PaperForm from './containers/paperForm'
import PaperUpload from './containers/upload';

import * as serviceWorker from './serviceWorker';
// const routing = (
//     // <Router>
//     //     <div>
//     //         <ul>
//     //             <li><Link to="/">default</Link></li>
//     //             <li><Link to="/landing">landing</Link></li>
//     //             <li><Link to="/articleprofile">articleProfile</Link></li>
//     //             <li><Link to="/form">paperForm</Link></li>
//     //         </ul>
//     //         <Route exact path="/" component={App} />
//     //         <Route path="/landing" component={Landing}/>
//     //         <Route path="/articleprofile" component={ArticleProfile} />
//     //         <Route path="/form" component={PaperForm} />
//     //     </div>
//     // </Router>
// )

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
