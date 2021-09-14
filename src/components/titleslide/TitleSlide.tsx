import React from "react";

import { ThemeConsumer } from "../../context/ThemeContext";

type BackgroundSizes = "FitToSlide";

type Props = {
  title: React.Component | string;
  subtitle?: React.Component | string;
  children?: any;
  secondary?: boolean;
  tertiary?: boolean;
  backgroundImage?: string;
  backgroundSize?: BackgroundSizes;
};

export default ({
  title,
  subtitle,
  children,
  secondary,
  tertiary,
  backgroundImage,
  backgroundSize
}: Props) => (
  <ThemeConsumer>
    {(theme: any) => {
      let className = theme["title-slide"];

      if (secondary) className = theme["title-slide-secondary"];

      if (tertiary) className = theme["title-slide-tertiary"];

      let style = {};

      if (backgroundImage) {
        style = { ...style, backgroundImage: `url(${backgroundImage})` };
      }

      if (backgroundSize === "FitToSlide") {
        style = {
          ...style,
          backgroundSize: "cover"
        };
      }

      return (
        <div className={className} style={style}>
          {children}
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
        </div>
      );
    }}
  </ThemeConsumer>
);
