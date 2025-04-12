export const formatMerged = (val) => (val ? "✅" : "");

export const formatLink = (val) => (
    <a
        href={val}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
    >
      {val}
    </a>
);

export const formatDateTime = (val) => new Date(val).toLocaleString("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});