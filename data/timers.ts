/**
 * @title Timeouts & Intervals
 * @difficulty beginner
 * @tags cli, deploy, web
 * @run <url>
 *
 * Timers are used to schedule functions to happen at a later time.
 */

// Here we create a timer that will print "Hello, World!" to the console after
// 1 second (1000 milliseconds).
setTimeout(() => console.log("Hello, World!"), 1000);

// You can also cancel a timer after it has been created.
const timerId = setTimeout(() => console.log("No!"), 1000);
clearTimeout(timerId);

// Intervals can be created to repeat a function at a regular interval.
setInterval(() => console.log("Hey!"), 1000);

// Intervals can also be cancelled.
const intervalId = setInterval(() => console.log("Nope"), 1000);
clearInterval(intervalId);
