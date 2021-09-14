import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ThemeContext from '../../../context/ThemeContext';
import ProgressBar from '../ProgressBar';

describe('ProgressBar Component', () => {
  afterEach(cleanup);

  const props = { progress: 0 };

  const getComponent = (p = props) => (
    <ThemeContext.Provider value={{}}>
      <ProgressBar {...p} />
    </ThemeContext.Provider>
  );

  test.each([[0, '0%'], [5, '5%'], [100, '100%'], [105, '100%']])(
    'loads and displays the correct percentage when the progress is %d',
    (progress, percentage) => {
      const { container } = render(
        getComponent({ progress: progress as number })
      );
      // @ts-ignore
      const { style } = container.firstChild || { style: { width: -1 } };
      expect(style.width).toEqual(percentage);
    }
  );
});
