/**
 * @title Process Information
 * @difficulty beginner
 * @tags cli
 * @run <url>
 * @resource {https://deno.land/#installation} Deno: Installation
 * @resource {https://deno.land/manual@v1.17.2/getting_started/setup_your_environment} Manual: Set up your environment
 */

// The process id is easily accessible in the `Deno` namespace
console.log(Deno.pid);

// As is the parent process id.
console.log(Deno.ppid);
