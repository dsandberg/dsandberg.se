// react
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const Header = ({ page }) => {
    return (
      <div className={page.background === 'light' ? 'header-wrapper dark' : 'header-wrapper' }>
          <h1>{page.header}</h1>
      </div>
    );
};

export default Header;