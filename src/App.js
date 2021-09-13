import React from "react";
import { SlideDeck } from "./components/SlideDeck";
import theme from "./theme.module.scss";

// TODO: Move out to code slide
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import TitleSlide from "./components/TitleSlide";
import Slide from "./components/Slide";

function App() {
  const slides = [
    <TitleSlide
      title="stress-free feature tests"
      subtitle="Harrison Kelly 9/25/2019"
    />,
    <TitleSlide title="what are they?" secondary>
      <img
        src="https://media.giphy.com/media/V4uGHRgz0zi6Y/source.gif"
        alt=""
        style={{ height: "500px", paddingTop: "50px" }}
      />
    </TitleSlide>,
    <Slide
      title="they're amazingly powerful"
      subtext="Use them to be able to test"
    >
      <ul>
        <li className={theme["with-bullet"]}>
          Whether or not the flow of a feature works as designed
        </li>
        <li className={theme["with-bullet"]}>
          Interactions between multiple components work as expected
        </li>
      </ul>
    </Slide>,
    <TitleSlide title="what are they not?" secondary />,
    <Slide title="they're not a lot of things">
      <ul>
        <li>🙅‍♂️ made to test individual components</li>
        <li>‍🙅‍♂️ a replacement for unit testing</li>
        <li>‍🙅‍♂️ a way to test backend APIs</li>
      </ul>
    </Slide>,
    <TitleSlide
      title="Okay...but should this be a feature test? 🤔"
      tertiary
    />,
    <Slide>
      <p>If you want to test a single component...it should be a unit test.</p>
    </Slide>,
    <Slide animate={false}>
      <p>If you want to test a single component...it should be a unit test.</p>
      <p>
        If you want to check that <strong>lots</strong> of selectors are on the
        page...it should be a unit test.
      </p>
    </Slide>,
    <Slide title="puppeteer" subtext="Programatically control Chromium">
      <p>
        Allows for taking screenshots of pages and automating keyboard and mouse
        interactions.
      </p>
    </Slide>,
    <TitleSlide title="oh so brittle 😬" secondary />,
    <Slide title="account for the brittleness">
      <ul>
        <li className={theme["with-bullet"]}>
          Use feature tests to validate{" "}
          <strong>areas that unit tests cannot</strong>
        </li>
        <li className={theme["with-bullet"]}>
          Test the <strong>major workflows</strong> that the user is going to do
        </li>
      </ul>
    </Slide>,
    <TitleSlide title="the basics" secondary>
      <img
        src="https://media.giphy.com/media/VGG8UY1nEl66Y/source.gif"
        alt=""
        style={{ height: "500px", paddingTop: "50px" }}
      />
    </TitleSlide>,
    <Slide
      title="timing issues"
      subtext="Just don't cause them and we'll have better tests 🤷‍♂️"
    ></Slide>,
    <Slide title="joking...">
      <p>
        Chromium's performance is different (aka 🐌) on Jenkins than it is on
        your Mac.
      </p>
    </Slide>,
    <Slide title="joking..." animate={false}>
      <p>
        Chromium's performance is different (aka 🐌) on Jenkins than it is on
        your Mac.
      </p>
      <p>
        Account for this by waiting for <strong>specific</strong> selectors to
        exist instead of <i>assuming</i> the event/action you triggered will be
        completed in time.
      </p>
    </Slide>,
    <Slide>
      <p>
        Even though the <pre className={theme.inline}>Loader</pre> component
        went away when you tested on your Mac, <strong>make sure</strong> that
        it is off the screen.
      </p>
    </Slide>,
    <Slide animate={false}>
      <p>
        Even though the <pre className={theme.inline}>Loader</pre> component
        went away when you tested on your Mac, <strong>make sure</strong> that
        it is off the screen.
      </p>
      <p>
        That <pre className={theme.inline}>Page#waitFor</pre> call might add a
        few milliseconds to your test, but that is <strong>much better</strong>{" "}
        than a test that periodically fails on{" "}
        <pre className={theme.inline}>master</pre>.
      </p>
    </Slide>,
    <TitleSlide title="assumptions 👎" tertiary>
      <img
        src="https://media.giphy.com/media/smW5FBep69d3q/source.gif"
        alt=""
        style={{ height: "350px", paddingTop: "50px" }}
      />
    </TitleSlide>,
    <Slide title="make sure it's there!">
      <p>
        Prevent misleading test failures by{" "}
        <pre className={theme.inline}>expect</pre>ing an initial state instead
        of <strong>assuming</strong> it'll be that way.
      </p>
    </Slide>,
    <Slide title="here is a really good test ✌️">
      <SyntaxHighlighter
        language="javascript"
        theme={docco}
        customStyle={{ fontSize: "1.25rem" }}
      >
        {`const getSelectedCharacter = () => document
  .querySelector('#SelectedCharacter')
  .textContent;`}
      </SyntaxHighlighter>
      <SyntaxHighlighter
        language="javascript"
        theme={docco}
        customStyle={{ fontSize: "1.25rem" }}
      >
        {`it('finds Frodo in the Shire and makes sure he has the ring', async () => {
  await page.goto('/the_shire?character=frodo');

  // Make sure that the correct character is selected to fail early.
  await expect(page.evaluate(getSelectedCharacter).toEqual('frodo');

  const hasRing = await page.$('#HasRing');
  expect(hasRing).toBeTruthy();
})`}
      </SyntaxHighlighter>
    </Slide>,
    <Slide title="breakfast 👎">
      <SyntaxHighlighter
        language="javascript"
        theme={docco}
        customStyle={{ fontSize: "1.25rem" }}
      >
        {`it('makes sure that the hobbits get second breakfast', async () => {
  await page.goto('/breakfast?character=pippin');

  const count = await page.$('#BreakfastCount');
  expect(count).toEqual(2);
})`}
      </SyntaxHighlighter>
      <p>
        "pippin" is an invalid character and it defaults to "aragon", who
        doesn't understand second breakfast.
      </p>
      <p>
        This test fails with <pre className={theme.inline}>count</pre> equaling
        1.
      </p>
    </Slide>,
    <Slide>
      <p>
        It isn't clear that "pippin" was never selected and it looks like the
        breakfast count is broken. This could lead to wasted effort digging into
        that.
      </p>
    </Slide>,
    <Slide animate={false}>
    <p>
      It isn't clear that "pippin" was never selected and it looks like the
      breakfast count is broken. This could lead to wasted effort digging into
      that.
    </p>
    <p>
      Rewrite the test to check the selected character so that the test will
      fail when "aragon" is selected.
    </p>
  </Slide>,
    <TitleSlide title="screenshots" tertiary>
      <img
        src="https://media.giphy.com/media/kVum4D3XCL6Wk/giphy.gif"
        alt=""
        style={{ height: "500px" }}
      />
    </TitleSlide>,
    <Slide>
      <p>
        Wonderful way to make sure that the page <strong>looks the same</strong>{" "}
        each time the test is run (Styling, data, etc.)
      </p>
      <p>
        Try to make screenshots <strong>small</strong> by passing in a specific
        selector. Small screenshots can show you what is broken and what is
        still working.
      </p>
      <p>A 40000x1024 screenshot is nearly impossible to fully diff.</p>
    </Slide>,
    <TitleSlide title="why is this broken" secondary>
      <img
        src="https://media.giphy.com/media/njYrp176NQsHS/source.gif"
        style={{ height: "500px" }}
        alt=""
      />
    </TitleSlide>,
    <Slide title="data changed">
      <ul>
        <li className={theme["with-bullet"]}>
          Use the feature test account, that shouldn’t change
        </li>
        <li className={theme["with-bullet"]}>
          Use{" "}
          <pre className={theme.inline}>getAllResponseFieldsForSignature</pre>{" "}
          to get the response from the API and use that to know what to expect
          instead of hard-coding values (such as hero graphic counts, row
          counts, etc.)
        </li>
      </ul>
    </Slide>,
    <Slide
      title="request/responses not found"
      subtext="Page made requests that were not recorded"
    >
      <ol>
        <li>Are there any ongoing requests?</li>
        <li>Are the request params the same every time?</li>
        <li>
          Post in <pre className={theme.inline}>#puppeteer</pre> and someone
          will help you
        </li>
      </ol>
    </Slide>,
    <TitleSlide title="timing issues" tertiary>
      <img
        src="https://media.giphy.com/media/eGNPC9HNmMS4M/source.gif"
        style={{ height: "500px" }}
        alt=""
      />
    </TitleSlide>,
    <Slide>
      <p>
        Wait for <strong>specific elements</strong> to appear on the page
        instead of assuming everything is loaded.
      </p>
    </Slide>,
    <Slide animate={false}>
      <p>
        Wait for <strong>specific elements</strong> to appear on the page
        instead of assuming everything is loaded.
      </p>
      <p>
        Don't waiting for network idle or a specific time interval for no
        reason, it might work locally, but it{" "}
        <strong>can break on Jenkins</strong> or in the future.
      </p>
    </Slide>,
    <Slide animate={false}>
      <p>
        Wait for <strong>specific elements</strong> to appear on the page
        instead of assuming everything is loaded.
      </p>
      <p>
        Don't waiting for network idle or a specific time interval for no
        reason, it might work locally, but it{" "}
        <strong>can break on Jenkins</strong> or in the future.
      </p>
      <p>
        Make sure that what you’re clicking can be clicked. Puppeteer does not
        know if there is another element (a loader for example) above the
        target.
      </p>
    </Slide>,
    <Slide title="recording again causes different results">
      If the API is returning an Array that is different each time, the front
      end might need to sort the data
    </Slide>,
    <Slide title="slow iteration cycles">
      <ul>
        <li className={theme["with-bullet"]}>
          Smaller suites take less time and will have a smaller chance of having
          to fix other tests when recorded
        </li>
        <li className={theme["with-bullet"]}>
          Use <pre className={theme.inline}>.only</pre> when recording new tests
          to quickly write them. Then record the entire suite.
        </li>
        <li className={theme["with-bullet"]}>
          TDD is wonderful. Don't wait until the very end to write{" "}
          <strong>lots</strong> of tests!
        </li>
      </ul>
    </Slide>,
    <Slide title="Test Driven Development">
      <ul>
        <li>
          <a href="https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80">
            TDD Changed My Life
          </a>
        </li>
        <li>
          <a href="https://medium.com/@admm/test-driven-development-in-react-is-easy-178c9c520f2f">
            React + TDD = ❤️
          </a>
        </li>
        <li>
          <a href="https://medium.com/@rossbulat/test-driven-development-in-react-with-jest-and-enzyme-2a6cf2cc3071">
            Test Driven Development in React with Jest and Enzyme
          </a>
        </li>
      </ul>
    </Slide>,
    <TitleSlide title="moving forwards" secondary>
      <img
        src="https://media.giphy.com/media/uh79HSM4ePaNO/giphy.gif"
        style={{ height: "500px" }}
        alt=""
      />
    </TitleSlide>,
    <Slide title="write more tests!">
      <p>
        The more tests you write, the better you'll know the APIs and all the
        best practices.
      </p>
      <p>So write more tests!</p>
    </Slide>,
    <Slide title="avoid copy paste">
      <p>Not all of our tests are great 🤷‍♂.️</p>
      <p>
        If you have a question, post in{" "}
        <pre className={theme.inline}>#puppeteer</pre> and someone will help
        you.
      </p>
    </Slide>,
    <TitleSlide title="node debugging" tertiary />,
    <Slide title="debugging">
      <ul>
        <li className={theme["with-bullet"]}>
          Add a <pre className={theme.inline}>debugger</pre> statement to a
          failing test
        </li>
        <li className={theme["with-bullet"]}>
          This will allow you to easily debug tests in Chrome
        </li>
      </ul>
      <p>
        👉{" "}
        <a href="https://github.com/GoogleChrome/puppeteer#debugging-tips">
          Debugging Tips
        </a>
      </p>
    </Slide>,
    <TitleSlide title="screenshot debugging" tertiary />,
    <Slide>
      <p>
        Take screenshots to easily see what the page looks like at a certain
        point.
      </p>
      <SyntaxHighlighter
        language="javascript"
        theme={docco}
        customStyle={{ fontSize: "1.25rem" }}
      >
        {`await page.screenshot({ path: '<a path>' })`}
      </SyntaxHighlighter>
      <p>
        This will help you if you think the front end is in a specific state,
        but your test isn't working correctly.
      </p>
    </Slide>
  ];
  return (
    <SlideDeck
      title="Stress-free Feature Testing"
      theme={theme}
      slides={slides}
      showNavigation
    />
  );
}

export default App;
