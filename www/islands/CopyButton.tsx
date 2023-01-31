import { Copy } from "$components/icons.tsx";

export default function CopyButton(props: { text: string }) {
  return (
    <div class="absolute top-2 right-2 flex items-center z-10">
      <button
        class="rounded border border-[#D2D2DC] p-1.5 bg-gray-100 hover:bg-[#D2D2DC]"
        onClick={() => navigator?.clipboard?.writeText(props.text)}
      >
        <Copy />
      </button>
    </div>
  );
}
