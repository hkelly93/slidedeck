import React, { useState } from "react";
import { createBrowserHistory } from "history";

import useSetTitle from "../../effects/useSetTitle";
import useSetHistory from "../../effects/useSetHistory";
import useKeyDown from "../../effects/useKeyDown";
import useClick from "../../effects/useClick";

import ProgressBar from "../progressbar/ProgressBar";
import Slide from "../slide/Slide";
import Navigation from "../navigation/Navigation";

import { ThemeProvider } from "../../context/ThemeContext";

import { configureRouter } from "../../utils/route";
import { calculateProgress } from "../../utils/progress";

import defaultTheme from '../../theme.module.scss';
console.log('called')
const history = createBrowserHistory();

type Props = {
  title: string;
  theme: any;
  slides: Array<typeof Slide>;
  showNavigation: boolean;
};

export const SlideDeck = ({ title, theme , slides, showNavigation }: Props) => {
  const currentSlide = history.location.pathname.replace("/", "") || 0;

  const [slide, setSlide] = useState(Number(currentSlide));

  const forwards = () => {
    const nextSlide = slide + 1;

    if (nextSlide < slides.length) setSlide(nextSlide);
  };

  const backwards = () => {
    const previousSlide = slide - 1;

    if (previousSlide > -1) setSlide(previousSlide);
  };

  useSetTitle(title);
  useSetHistory(history, slide);
  useKeyDown(forwards, backwards);
  useClick(forwards);

  const progress = calculateProgress(slide, slides);

  return (
    <div className={defaultTheme["slide-deck"]}>
      <ThemeProvider value={defaultTheme}>
        {showNavigation && (
          <Navigation forwards={forwards} backwards={backwards} />
        )}
        {configureRouter(history, slides)}

        <ProgressBar progress={progress} />
      </ThemeProvider>
    </div>
  );
};
