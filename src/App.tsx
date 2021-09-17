import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import '@patternfly/react-core/dist/styles/base.css';
import './App.css';

import MainScreen from './components/mainScreen/MainScreen';

const App: React.FC = () => {
  return (
    <Router>
      <MainScreen />
    </Router>
  );
};

export default App;
