/**
 * @title Hex and Base64 Encoding
 * @difficulty beginner
 * @tags cli
 * @run <url>
 * @resource {https://jsr.io/@std/encoding} Doc: @std/encoding
 * @dependency jsr:@std/encoding
 *
 * There are a few cases where it would be practical to encode
 * and decode between different string and array buffer formats.
 * The Deno standard library makes this easy.
 */

// The standard library provides hex and base64 encoding and decoding utilities
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
import { decodeHex, encodeHex } from "@std/encoding/hex";

// We can easily encode a string into base64 using the encodeBase64 method.
const base64Encoded = encodeBase64("somestringtoencode");
console.log(base64Encoded); // "c29tZXN0cmluZ3RvZW5jb2Rl"

// We can then decode base64 into a byte array using the decodeBase64 method.
const base64Decoded = decodeBase64(base64Encoded);
console.log(base64Decoded); // Uint8Array(18) [ 115, 111, 109, 101, 115, ... ]

// If we want to get the value as a string we can use the built-in TextDecoder.
const textDecoder = new TextDecoder();
console.log(textDecoder.decode(base64Decoded)); // "somestringtoencode"

// We can also encode a string into hex using the encodeHex method.
const hexEncoded = encodeHex("some text to encode");
console.log(hexEncoded); // "736f6d65207465787420746f20656e636f6465"

// We can convert back to a string by using the decode method.
const hexDecoded = decodeHex(hexEncoded);
console.log(textDecoder.decode(hexDecoded)); // "some text to encode"
