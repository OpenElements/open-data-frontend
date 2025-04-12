import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faXmark, faMinus} from "@fortawesome/free-solid-svg-icons";

export const formatMerged = (val) => (val ? "✅" : "");

export const formatPrStatus = (val) => {
  switch (val) {
    case "merged":
      return <span title="Dieser PR wurde gemergt" className="text-green-600"><FontAwesomeIcon icon={faCheck} className="mr-1" /></span>;
    case "open":
      return <span title="Dieser PR ist offen" className="text-blue-600"><FontAwesomeIcon icon={faMinus} className="mr-1" /></span>;
    case "closed":
      return <span title="Dieser PR wurde geschlossen" className="text-red-600"><FontAwesomeIcon icon={faXmark} className="mr-1" /></span>;
    default:
      return val;
  }
};

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