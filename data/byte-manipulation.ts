/**
 * @title Manipulating byte arrays
 * @difficulty beginner
 * @tags cli
 * @run <url>
 * @resource {https://jsr.io/@std/bytes} Doc: @std/bytes
 * @dependency jsr:@std/bytes
 *
 * When working with lower-level data we often deal
 * with byte arrays in the form of Uint8Arrays. There
 * are some common manipulations and queries that can
 * be done and are included with the standard library.
 */

import { concat } from "@std/bytes/concat";
import { repeat } from "@std/bytes/repeat";
import { copy } from "@std/bytes/copy";

const a = new Uint8Array([0, 1, 2, 3, 4]);
const b = new Uint8Array([5, 6, 7, 8, 9]);
const c = new Uint8Array([4, 5]);

// We can concatenate two byte arrays using the
// concat method.
const d = concat([a, b]);
console.log(d); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Repeat can be used to repeat a chunk of bytes a specified number of times.
console.log(repeat(c, 4)); // [4, 5, 4, 5, 4, 5, 4, 5]

// We can also copy a chunk of bytes from one array to another.
const cpy = new Uint8Array(5);
console.log("Bytes copied:", copy(b, cpy)); // 5
console.log("Bytes:", cpy); // [5, 6, 7, 8, 9]
