import React from 'react';

import { ThemeConsumer } from '../../context/ThemeContext';

type Props = {
  forwards: () => void;
  backwards: () => void;
};

export default ({ forwards, backwards }: Props) => (
  <ThemeConsumer>
    {(theme: any) => (
      <div className={theme.navigation}>
        <button onClick={backwards} className={theme['left-arrow']}>
          {'<'}
        </button>
        <button onClick={forwards} className={theme['right-arrow']}>
          {'>'}
        </button>
      </div>
    )}
  </ThemeConsumer>
);
