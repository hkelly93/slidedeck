import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ThemeContext from '../../../context/ThemeContext';
import Navigation from '../Navigation';

describe('Navigation Component', () => {
  afterEach(cleanup);

  const props = { forwards: jest.fn(), backwards: jest.fn() };

  const getComponent = (p = props) => (
    <ThemeContext.Provider value={{}}>
      <Navigation {...p} />
    </ThemeContext.Provider>
  );

  test('loads and displays navigation arrows', () => {
    const { asFragment } = render(getComponent());

    expect(asFragment).toMatchSnapshot();
  });

  test('calls props#forwards when the right arrow is clicked', () => {
    const { getByText } = render(getComponent());

    fireEvent.click(getByText('>'));
    expect(props.forwards).toHaveBeenCalled();
  });

  test('calls props#backwards when the left arrow is clicked', () => {
    const { getByText } = render(getComponent());

    fireEvent.click(getByText('<'));
    expect(props.backwards).toHaveBeenCalled();
  });
});
