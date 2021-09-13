import { useEffect } from "react";

import { buildPath } from "../utils/route";
/**
 * Sets the hash based on the slide number.
 */
export default (history: any, slide: number) => {
  useEffect(() => {
    history.push(buildPath(slide));
  }, [history, slide]);
};
