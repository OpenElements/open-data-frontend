import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavItem({ label, to, items = [] }) {
  const hasChildren = items.length > 0;
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Klick außerhalb schließt Dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!hasChildren) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `px-4 py-2 font-semibold ${
                    isActive
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-700 border-b-2 border-transparent hover:text-blue-600"
                }`
            }
        >
          {label}
        </NavLink>
    );
  }

  return (
      <div className="relative" ref={ref}>
        <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 font-semibold text-gray-700 hover:text-blue-600"
        >
          {label} <span className="ml-1">▾</span>
        </button>
        {open && (
            <div className="absolute left-0 z-10 bg-white border shadow-md rounded mt-2 min-w-max flex flex-col">
              {items.map(({ to, label }) => (
                  <NavLink
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                          `px-4 py-2 text-sm ${
                              isActive
                                  ? "bg-blue-100 text-blue-700 font-medium"
                                  : "text-gray-700 hover:bg-gray-100"
                          }`
                      }
                  >
                    {label}
                  </NavLink>
              ))}
            </div>
        )}
      </div>
  );
}