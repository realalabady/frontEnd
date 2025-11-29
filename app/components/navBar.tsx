import { useState } from "react";
import { NavLink } from "react-router";
import { FaLaptop, FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const base = "transition hover:text-blue-700 hover:scale-105 ";
  const active = "text-blue-500 font-semibold hover:text-blue-500 ";

  const links: { to: string; label: string }[] = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/project", label: "Project" },
    // { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to={"/"}
          className="flex text-white text-lg font-semibold hover:text-gray-300"
          onClick={() => setOpen(false)}
        >
          <FaLaptop className="text-blue-500 text-2xl " />
          <span className="ml-2">DevPortfolio</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? `${base} ${active}` : base
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span className="sr-only">Open main menu</span>
          {open ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu, toggleable (vertical stack) */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-max-height duration-300 ease-in-out overflow-hidden bg-gray-800 border-t border-gray-700 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 flex flex-col space-y-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `w-full text-left block px-4 py-2 rounded-md text-base text-gray-200 hover:bg-gray-700 ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
