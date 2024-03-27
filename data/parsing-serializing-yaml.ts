/**
 * @title Parsing and serializing YAML
 * @difficulty beginner
 * @tags cli, deploy, web
 * @run <url>
 * @resource {/import-export} Example: Importing & Exporting
 * @resource {https://yaml.org} Spec: YAML
 * @resource {https://jsr.io/@std/yaml} Doc: @std/yaml
 * @dependency jsr:@std/yaml
 *
 * YAML is a widely used data serialization language designed to be easily human readable and writeable.
 */
import { parse, stringify } from "@std/yaml";

// To parse a YAML string, you can use the the standard library's YAML
// parse function. The value is returned as a JavaScript object.
const text = `
foo: bar
baz:
  - qux
  - quux
`;
const data = parse(text);
console.log(data.foo);
console.log(data.baz.length);

// To turn a JavaScript object into a YAML string, you can use the standard
// library's YAML stringify function.
const obj = {
  hello: "world",
  numbers: [1, 2, 3],
};
const yaml = stringify(obj);
console.log(yaml);
//- hello: word
//- numbers:
//-   - 1
//-   - 2
//-   - 3
