// React
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


// Components
import Menu from '../components/menu.js';
import Pagination from '../components/pagination.js';
import Header from '../components/header.js';

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: '',
      mount: true,
      links: ['hello', 'stuff', 'me', 'sayhi'],
      pages: {
        hello: {
          title: 'hello',
          header: 'Lorem ipsum dolor sit amet ...',
          background: 'pink',
          color: 'white',
          content: '',
          render: true
        },
        stuff: {
          title: 'stuff',
          header: 'Lorem stuff ...',
          background: 'light',
          color: 'white',
          content: ''
        },
        me: {
          title: 'me',
          header: 'Lorem me ...',
          background: 'turquoise',
          color: 'white',
          content: ''
        },
        sayhi: {
          title: 'say hi',
          header: 'Lorem say hi ...',
          background: 'darkgray',
          color: 'white',
          content: ''
        }
      }
    };

    const timeout = false;
    const scrollTimeout = false;
    
    this.scrollFn = this.MouseWheelHandler.bind(this);
    
  }
  
  componentWillMount() {
    this.setState({active: this.props.match.params.title});

  }

  componentDidMount() {
    this.addScrollHandler();
  }

  addScrollHandler() {
      document.addEventListener("mousewheel", this.scrollFn(), false);
      document.addEventListener("DOMMouseScroll", this.scrollFn(), false);
      
      // document.removeEventListener("mousewheel", this.scrollFn(), false);
      // document.removeEventListener("DOMMouseScroll", this.scrollFn(), false);
  }

  MouseWheelHandler() {
    return (e) => {
      e.preventDefault();
        let activeNr = this.state.links.indexOf(this.state.active);
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      console.log('scroll');
        //scrolling down
        if (delta < 0) {

          if (!this.timeout) {
            this.timeout = true;
            setTimeout(() => {
              this.timeout = false;
            }, 1500);
            activeNr++;

            if (activeNr <= this.state.links.length -1) {
              // this.setState({active: this.state.links[activeNr]})
              this.props.history.push(this.state.links[activeNr]);
            } else {
              activeNr++;
            }
          }
        }

        //scrolling up
        else {

           if (!this.timeout) {
            this.timeout = true;
            setTimeout(() => {
              this.timeout = false;
            }, 1500);
            activeNr--;

            if (activeNr >= 0) {
              // this.setState({active: this.state.links[activeNr]})
              this.props.history.push(this.state.links[activeNr]);
            } else {
              activeNr++;
            }
          }
        }
        return false;
    };
}


  componentWillReceiveProps(nextProps) {
    const _this = this;
    // console.log('componentWillReceiveProps');
    this.setState({active: nextProps.match.params.title})
    this.klick();

    setTimeout(function() {
      _this.setState({mount: true})
    }, 500);

  }

  listPages() {
    const list = [];
    for (const page in this.state.pages) {
      list.push(this.state.pages[page].title);
    }
    return list;
  }

  klick() {
    const _this = this;
    const toggle = this.state.mount = !this.state.mount;
    this.setState({mount: toggle});
    // setTimeout(function() {
    //   const toggle = this.state.mount = !this.state.mount;
    //   this.setState({mount: toggle});
    // }, 500);
  }

  mountHeader() {
    return this.state.mount ? <Header page={this.state.pages[this.state.active]}/> : '';
  }

  render() {

    return (
      <div id="mainview" className={this.state.pages[this.state.active].background}>
        <Menu onClick={this.klick.bind(this)} activePage={this.props.match.params.title} pages={this.listPages()}/>
        <Pagination activePage={this.props.match.params.title} pages={this.listPages()}/>
        <CSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {this.mountHeader()}
       </CSSTransitionGroup>
      </div>
    )
  }
}