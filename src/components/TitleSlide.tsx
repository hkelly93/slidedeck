import React from "react";

import { ThemeConsumer } from "../context/ThemeContext";

type Props = {
  title: React.Component | string;
  subtitle?: React.Component | string;
  children?: any;
  secondary?: boolean;
  tertiary?: boolean;
};

export default ({ title, subtitle, children, secondary, tertiary }: Props) => (
  <ThemeConsumer>
    {(theme: any) => {
      let className = theme["title-slide"];

      if (secondary) className = theme["title-slide-secondary"];

      if (tertiary) className = theme["title-slide-tertiary"];

      return (
        <div className={className}>
          {children}
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
        </div>
      );
    }}
  </ThemeConsumer>
);
