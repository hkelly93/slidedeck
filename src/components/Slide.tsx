import React from "react";
import classnames from "classnames";
import { ThemeConsumer } from "../context/ThemeContext";

type Props = {
  title?: string;
  subtext?: React.Component | string;
  children: React.Component | string;
  footer?: React.Component | string;
  animate?: boolean;
};

export default ({
  title,
  subtext,
  children,
  footer,
  animate = true
}: Props) => (
  <ThemeConsumer>
    {(theme: any) => (
      <div className={classnames(theme.slide, { [theme.animate]: animate })}>
        {title && <h1>{title}</h1>}

        {subtext && <div className={theme.subtext}>{subtext}</div>}

        {children}

        {footer ? footer : null}
      </div>
    )}
  </ThemeConsumer>
);
