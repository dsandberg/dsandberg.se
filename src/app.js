// Sass
const css = require('./app.scss');

// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


// Pages (components)
import MainView from './pages/mainview.js';

// Components
import Menu from './components/menu.js';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    
    render() {
        return(
            <Router>
                <div className="wrapper">
                 <Switch>
                    <Route path="/:title" component={MainView}/>
                </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
