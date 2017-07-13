// react
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagenr: 1
    };
  }

  componentDidMount() {
    // setTimeout(() => this.setState({pagenr: 8}), 1000);
  }
  componentWillReceiveProps(nextProps) {

  }

  mount() {
    if (this.state.doit) {
    return <h2>{'0' + this.getPageNr()}</h2>
    }
  }

  mapDots() {
    const activePage = this.props.activePage;
    const dots = this.props.pages.map((page) => {
      const noSpace = page.replace(/ /g,'');
      return (
        <Link key={page} to={noSpace}>
          <div className={activePage === noSpace ? 'pagination-dot active' : 'pagination-dot'}></div>
        </Link>
      )
    });
    return dots;
  }

  getPageNr() {
    const activePage = this.props.activePage;
    const pages = this.props.pages.map((p) => p.replace(/ /g,''));
    const indexNr = pages.indexOf(activePage) + 1;
    return <h2 key={indexNr}>{'0' + indexNr}</h2>
  }

  toggleMenu() {
    const toggle = this.state.active = !this.state.active;
    this.setState({active: toggle})
  }

  render() {
    return (
      <div className={this.props.activePage === 'stuff' ? 'pagination-wrapper dark': 'pagination-wrapper'}>
       <div>
         <div className="pagination-number">
           {/*<CSSTransitionGroup
              transitionName="slide" 
              transitionLeaveTimeou={1000} 
              transitionEnterTimeout={1000}>*/}
              {this.getPageNr()}
            {/*</CSSTransitionGroup>*/}
           <h3>/4</h3>
         </div>
         <div className="pagination-name">
           <h3>{this.props.activePage}</h3>
         </div>
       </div>
       <div className="pagination-dots">
         <div>
            {this.mapDots()}
         </div>
       </div>
      </div>
    );
  }
};