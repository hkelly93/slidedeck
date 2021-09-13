import React from "react";

import { ThemeConsumer } from "../context/ThemeContext";

export default ({ progress }: { progress: number }) => {
  return (
    <ThemeConsumer>
      {(theme: any) => (
        <div
          style={{ width: `${progress}%` }}
          className={theme["progress-bar"]}
        />
      )}
    </ThemeConsumer>
  );
};
