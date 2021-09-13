import React, { useState } from "react";
import { createBrowserHistory } from "history";

import useSetTitle from "../effects/useSetTitle";
import useSetHistory from "../effects/useSetHistory";
import useKeyDown from "../effects/useKeyDown";
import useClick from "../effects/useClick";

import ProgressBar from "./ProgressBar";
import Slide from "./Slide";
import Navigation from "./Navigation";

import { ThemeProvider } from "../context/ThemeContext";

import { configureRouter } from "../utils/route";
import { calculateProgress } from "../utils/progress";

const history = createBrowserHistory();

type Props = {
  title: string;
  theme: any;
  slides: Array<typeof Slide>;
  showNavigation: boolean;
};

export const SlideDeck = ({ title, theme, slides, showNavigation }: Props) => {
  const currentSlide = history.location.pathname.replace("/", "") || 0;

  const [slide, setSlide] = useState(Number(currentSlide));
  const forwards = () => setSlide(slide + 1);
  const backwards = () => setSlide(slide - 1);

  useSetTitle(title);
  useSetHistory(history, slide);
  useKeyDown(forwards, backwards);
  useClick(forwards);

  const progress = calculateProgress(slide, slides);

  return (
    <div className={theme["slide-deck"]}>
      <ThemeProvider value={theme}>
        {showNavigation && (
          <Navigation forwards={forwards} backwards={backwards} />
        )}

        {configureRouter(history, slides)}

        <ProgressBar progress={progress} />
      </ThemeProvider>
    </div>
  );
};
