// react
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

  }

  mapLinks() {
    if (this.state.active) {
      return this.props.pages.map((link, i) => {
        const noSpace = link.replace(/ /g,'');
        return (
          <li key={i}>
            <NavLink 
              to={noSpace} 
              className={this.props.activePage === noSpace ? 'active' : ''}>
              {link}
            </NavLink>
          </li>
        );
      });
    }
  }

  toggleMenu() {
    const toggle = this.state.active = !this.state.active;
    this.setState({active: toggle})
  }

  render() {
    return (
      <div className={this.props.activePage === 'stuff' ? 'menu-wrapper dark': 'menu-wrapper'}>
          <div className='menu-icon' onClick={this.toggleMenu.bind(this)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <nav>
            <ul>
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {this.mapLinks()}
              </CSSTransitionGroup>
            </ul>
          </nav>
      </div>
    );
  }
};