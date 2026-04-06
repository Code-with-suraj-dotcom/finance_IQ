import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Transactions", to: "/transactions" },
  { label: "Budget", to: "/budget" },
  { label: "Analytics", to: "/analytics" },
];

function CommonBanner({ appName = "LedgerLens" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-600">Finance Analysis Suite</p>
          <span className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
            v1
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{appName}</h1>

          <nav className="flex flex-wrap gap-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default CommonBanner;
