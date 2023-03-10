import { Example, ExampleGroup } from "../utils/example.ts";

export function IndexItem(props: { example: Example }) {
  return (
    <li>
      <a
        href={`/${props.example.id}`}
        class="underline"
        title={props.example.description}
      >
        {props.example.title}
      </a>
    </li>
  );
}

export function IndexGroup(props: { group: ExampleGroup }) {
  return (
    <li>
      <h2 class="font-bold text-lg">{props.group.title}</h2>
      <ul>
        {props.group.items.map((example) => <IndexItem example={example} />)}
      </ul>
    </li>
  );
}
