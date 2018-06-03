import React from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import DataDisplay from './DataDisplay';

const App = () => (
  <div>
    <Header />
    <div className="main">
      <Sidebar />
      <DataDisplay />
    </div>
  </div>
);


export default App;
