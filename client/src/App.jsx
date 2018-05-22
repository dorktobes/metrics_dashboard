import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DataDisplay from './components/DataDisplay';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <DataDisplay />
      </div>
    );
  }
}

App.propTypes = {
  
};

export default App;
