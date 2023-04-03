/**
 * @title Hashing
 * @difficulty intermediate
 * @tags cli, deploy
 * @run --allow-read <url>
 * @resource {https://deno.land/api?s=SubtleCrypto} Doc: crypto.subtle
 * @resource {https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest} MDN: Cryptographic Digests
 *
 * Hashing data is a common operation that is facilitated
 * through Deno's support for the Web Crypto API. In addition,
 * Deno's implementation extends the standard API, allowing for
 * more advanced uses.
 */

// In our first example, we'll hash the contents of a string variable.
const message = "The easiest, most secure JavaScript runtime.";

// Before we can pass our message to the hashing function,
// we first need to encode it into a uint8 array.
const messageBuffer = new TextEncoder().encode(message);

// Here, we use the built-in crypto.subtle.digest method to hash our original message.
// The hash is returned as an ArrayBuffer. To obtain a string
// we'll need to do a little more work.
const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);

// We can decode this into a string using the standard
// library's toHashString method.
import { toHashString } from "$std/crypto/to_hash_string.ts";
const hash = toHashString(hashBuffer);
console.log(hash);


// For our second example, we'll hash the contents of a file.
// Hashing a file is a common operation and doing this
// without loading the whole file into memory is a typical
// requirement.

// The standard library has extensions to the Web
// Crypto API that are useful when doing things
// like hashing a file. These can be accessed through the
// "crypto" module, a drop-in replacement for the Web Crypto
// API that delegates to the native implementation when
// possible.
import { crypto } from "$std/crypto/mod.ts";
const file = await Deno.open("example.txt", { read: true });

// We obtain an async iterable using the readable property.
const readableStream = file.readable;

// This time, when we call crypto.subtle.digest, we're using the
// imported version that allows us to operate on the
// async iterable.
const fileHashBuffer = await crypto.subtle.digest("SHA-256", readableStream);

// Finally, we obtain the hex result using toHashString like earlier.
const fileHash = toHashString(fileHashBuffer);
console.log(fileHash);

