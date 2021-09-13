import { useEffect } from "react";

/**
 * Sets the document title to the `title` prop passed in.
 */
export default (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
