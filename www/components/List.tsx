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
    <li class="md:w-1/4">
      <h2 class="text-lg flex gap-1 mb-1 items-center">
        {props.group.icon && (
          <div>
            <props.group.icon />
          </div>
        )}
        <div class="font-bold">
          {props.group.title}
        </div>
      </h2>
      <ul>
        {props.group.items.map((example) => <IndexItem example={example} />)}
      </ul>
    </li>
  );
}
