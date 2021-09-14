import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ThemeContext from '../../../context/ThemeContext';
import Slide from '../Slide';
import theme from '../../../theme.module.scss';

describe('Slide Component', () => {
  afterEach(cleanup);

  const props = {};

  const getComponent = (p = props, children: React.Component | string) => (
    <ThemeContext.Provider value={theme}>
      <Slide {...p}>{children}</Slide>
    </ThemeContext.Provider>
  );

  describe('Animate', () => {
    test('has the "animate" class when animate is enabled (default)', () => {
      const { container } = render(getComponent({}, 'Test'));
      const { firstChild } = container;

      expect(firstChild).toHaveClass(theme.slide);
      expect(firstChild).toHaveClass(theme.animate);
    });

    test('has the "animate" class when animate is enabled', () => {
      const { container } = render(getComponent({ animate: true }, 'Test'));
      const { firstChild } = container;

      expect(firstChild).toHaveClass(theme.slide);
      expect(firstChild).toHaveClass(theme.animate);
    });

    test('does not have the "animate" class when animate is disabled', () => {
      const { container } = render(getComponent({ animate: false }, 'Test'));
      const { firstChild } = container;

      expect(firstChild).toHaveClass(theme.slide);
      expect(firstChild).not.toHaveClass(theme.animate);
    });
  });

  describe('title', () => {
    test('does not appear if it is not passed', () => {
      const { queryByTestId } = render(getComponent({ animate: true }, 'Test'));

      expect(queryByTestId('title')).toBeNull();
    });

    test('does appear if it is passed', () => {
      const title = 'mytitle';
      const { queryByTestId } = render(
        getComponent({ animate: true, title }, 'Test')
      );

      const titleElement = queryByTestId('title');
      expect(titleElement).toHaveTextContent(title);
      expect(titleElement).toMatchSnapshot(); // Validate the tag.
    });
  });

  describe('subtext', () => {
    test('does not appear if it is not passed', () => {
      const { queryByTestId } = render(getComponent({ animate: true }, 'Test'));

      expect(queryByTestId('subtext')).toBeNull();
    });

    test('does appear if it is passed', () => {
      const subtext = 'mysubtext';
      const { queryByTestId } = render(
        getComponent({ animate: true, subtext }, 'Test')
      );

      const subtextElement = queryByTestId('subtext');
      expect(subtextElement).toHaveTextContent(subtext);
      expect(subtextElement).toHaveClass(theme.subtext);
      expect(subtextElement).toMatchSnapshot(); // Validate the tag.
    });
  });
});
