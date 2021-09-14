import React, { useState } from "react";
import classnames from "classnames";
import { ThemeConsumer } from "../context/ThemeContext";
import useEventListener from "@use-it/event-listener";

type Props = {
  title?: string;
  subtext?: React.Component | string;
  children: React.Component | string;
  footer?: React.Component | string;
  animate?: boolean;
  notes?: string;
};

const Slide =  ({
  title,
  subtext,
  children,
  footer,
  animate = true,
  notes = ''
}: Props) => {
  const [showNotes, setShowNotes] = useState(false);

  useEventListener("keydown", event => {
    const { keyCode } = event as any;
    const isN = keyCode === 78;

    setShowNotes(showNotes && isN ? false : true);
  });
    
  return (
  <ThemeConsumer>
    {(theme: any) => (
      <div className={classnames(theme.slide, { [theme.animate]: animate })}>
        {title && <h1>{title}</h1>}

        {subtext && <div className={theme.subtext}>{subtext}</div>}

        {children}

        {footer ? footer : null}

        {showNotes && <div className={theme.notes}>{notes}</div>}
      </div>
    )}
  </ThemeConsumer>
)};

export default Slide;
