// https://github.com/denoland/doc_components/blob/main/icons.tsx
function Copy() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.55566 2.7C1.55566 2.03726 2.09292 1.5 2.75566 1.5H8.75566C9.41841 1.5 9.95566 2.03726 9.95566 2.7V5.1H12.3557C13.0184 5.1 13.5557 5.63726 13.5557 6.3V12.3C13.5557 12.9627 13.0184 13.5 12.3557 13.5H6.35566C5.69292 13.5 5.15566 12.9627 5.15566 12.3V9.9H2.75566C2.09292 9.9 1.55566 9.36274 1.55566 8.7V2.7ZM6.35566 9.9V12.3H12.3557V6.3H9.95566V8.7C9.95566 9.36274 9.41841 9.9 8.75566 9.9H6.35566ZM8.75566 8.7V2.7L2.75566 2.7V8.7H8.75566Z"
        fill="#232323"
      />
    </svg>
  );
}

export default function CopyButton(props: { text: string; class?: string }) {
  return (
    <div
      class={`absolute top-2 right-2 flex items-center z-10 ${
        props.class ?? ""
      }`}
    >
      <button
        class="rounded border border-[#D2D2DC] p-1.5 bg-gray-100 hover:bg-[#D2D2DC]"
        onClick={() => navigator?.clipboard?.writeText(props.text)}
      >
        <Copy />
      </button>
    </div>
  );
}
