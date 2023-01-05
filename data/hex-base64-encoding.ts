/**
 * @title Hex and Base64 Encoding
 * @difficulty beginner
 * @tags cli
 * @run <url>
 *
 * There are a few cases where it would be practical to encode
 * and decode between different string and array buffer formats.
 * The Deno standard library makes this easy.
 */

// The standard library provides hex and base64 encoding and decoding utilities
import * as base64 from "https://deno.land/std@0.171.0/encoding/base64.ts";
import * as hex from "https://deno.land/std@0.171.0/encoding/hex.ts";

// We can easily encode a string or an array buffer into base64 using the base64.encode method.
const base64_encoded = base64.encode("somestringtoencode");
console.log(base64.encode(new Int8Array([1, 32, 67, 120, 19])));

// We can then decode base64 into a byte array using the decode method.
const base_64_decoded = base64.decode(base64_encoded);

// If we want to get the value as a string we can use the built-in TextDecoder.
// We will use these a lot so we can store them in variables to reuse them.
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
console.log(textDecoder.decode(base_64_decoded));

// To encode hex, we always use array buffers.
// To use a string as an input we can encode our text.
const array_buffer = textEncoder.encode("somestringtoencode");
const hex_encoded = hex.encode(array_buffer);
console.log(hex_encoded);

// To read our hex values as a string, we can decode the buffer.
console.log(textDecoder.decode(hex_encoded));

// We can convert back to a string by using the decode method.
const hex_decoded = hex.decode(hex_encoded);
console.log(textDecoder.decode(hex_decoded));
