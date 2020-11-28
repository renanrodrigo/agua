import React from 'react';
import { render } from '@testing-library/react';
import MainScreen from './MainScreen';

describe('<MainScreen />', () => {
  test('should render', async () => {
    const { getByText } = render(<MainScreen />);
    expect(getByText('AGUA')).toBeInTheDocument();
  });
});
