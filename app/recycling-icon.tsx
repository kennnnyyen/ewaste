const paths: Record<string, React.ReactNode> = {
  computer: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 21h8M12 16v5M6 8h5" />
    </>
  ),
  printer: (
    <>
      <path d="M6 8V3h12v5M6 17H3V8h18v9h-3" />
      <path d="M6 13h12v8H6zM17 10h1" />
    </>
  ),
  display: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="1.5" />
      <path d="M8 21h8M12 17v4M5 6h14" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M4 9h16M4 16h16M8 6h1M8 13h1M8 19h1M13 6h3M13 13h3M13 19h3" />
    </>
  ),
  board: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M8 8h7v7H8zM3 10h5M15 12h6M11 15v6M11 3v5M5 18h1M18 6h1" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <path d="M9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  drive: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="10" r="4" />
      <path d="m12 10 4 5M8 19h8" />
    </>
  ),
  cable: (
    <>
      <path d="M7 3v4M11 3v4M5 7h8v3a4 4 0 0 1-8 0V7ZM9 14v3a4 4 0 0 0 8 0v-2M15 15h4v-4h-4z" />
    </>
  ),
};
export default function RecyclingIcon({ name }: { name: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.board}
    </svg>
  );
}
