import React from 'react';

import { ThemeConsumer } from '../../context/ThemeContext';

type Props = {
  progress: number;
};

export default ({ progress }: Props) => {
  const safeProgress = progress > 100 ? 100 : progress;

  return (
    <ThemeConsumer>
      {(theme: any) => (
        <div
          style={{ width: `${safeProgress}%` }}
          className={theme['progress-bar']}
        />
      )}
    </ThemeConsumer>
  );
};
