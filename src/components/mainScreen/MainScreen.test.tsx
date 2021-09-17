import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import MainScreen from './MainScreen';

describe('<Router><MainScreen /></Router>', () => {
  test('should render', async () => {
    const { getByText } = render(
      <Router>
        <MainScreen />
      </Router>
    );
    expect(getByText('AGUA')).toBeInTheDocument();
  });
});
