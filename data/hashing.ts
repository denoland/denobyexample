/**
 * @title Hashing
 * @difficulty intermediate
 * @tags cli, deploy
 * @resource {https://deno.land/api?s=SubtleCrypto} Doc: crypto.subtle
 * @resource {https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest} MDN: Cryptographic Digests
 *
 * Hashing data is a common operation that is facilitated
 * through Deno's support of the Web Crypto API. There are
 * some more advanced uses that may require extensions to
 * the api that are provided by the standard library.
 */

// Our original plaintext message
const message = "The easiest, most secure JavaScript runtime.";

// We first need to encode it into a uint8 array since web
// crypto only accepts them as arguments.
const messageBuffer = new TextEncoder().encode(message);

// We are now able to use the subtle crypto api to hash
// our original message. Unfortunately, this is a buffer
// so if we wanted to convert to a hex string we'd have
// a little more work to do.
const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);

// We can decode this into a string using the standard
// library's toHashString method
import { toHashString } from "$std/crypto/to_hash_string.ts";
const hash = toHashString(hashBuffer);
console.log(hash);

// The standard library also has some useful extensions
// to the Web Crypto API that is useful when doing something
// like hashing a file. These can be accessed through the
// drop "crypto" which is a drop in replacement for standard
// Web Crypto which differs to the native implementation when
// possible.
import { crypto } from "$std/crypto/mod.ts";

// Hashing a file is quite the common operation and doing this
// without loading the whole file into memory is a common
// requirement.
const file = await Deno.open("example.txt", { read: true });

// We can obtain an async iterable using the readable property
const readableStream = file.readable;

// We can then use this as an async iterable and hash the file
const fileHashBuffer = await crypto.subtle.digest("SHA-256", readableStream);

// We can the obtain the hex result using toHashString like earlier
const fileHash = toHashString(fileHashBuffer);
console.log(fileHash);
