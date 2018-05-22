import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import MetaDisplay from './MetaDisplay';

class Sidebar extends Component {
  
  render() {
    return (
      <div>
        <Dropdown />
        <MetaDisplay />
      </div>
    );
  }
}

Sidebar.propTypes = {
  
};

export default Sidebar;
