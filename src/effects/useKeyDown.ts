import useEventListener from "@use-it/event-listener";

// Keycode mappings.
const SPACE = 32;
const ENTER = 13;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_UP = 38;
const ARROW_DOWN = 40;

const goForwardsKeys = [SPACE, ENTER, ARROW_RIGHT, ARROW_DOWN];
const goBackwardsKeys = [ARROW_LEFT, ARROW_UP];

export default (forwards: () => void, backwards: () => void) => {
  useEventListener("keydown", event => {
    const { keyCode } = event as React.KeyboardEvent<Object>;

    if (goForwardsKeys.includes(keyCode)) forwards();
    if (goBackwardsKeys.includes(keyCode)) backwards();
  });
};
