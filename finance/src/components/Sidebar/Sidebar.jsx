import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TbMenu2, TbX, TbDashboard, TbExchange, TbTarget, TbChartLine } from "react-icons/tb";
import { useUI } from "../../context/UIContext";

function Sidebar() {
	const { isSidebarOpen: isOpen, toggleSidebar } = useUI();

	// Close sidebar on mobile when navigating
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				// Mobile resize handling can be added if needed
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const navItems = [
		{ path: "/dashboard", label: "Dashboard", icon: TbDashboard },
		{ path: "/transactions", label: "Transactions", icon: TbExchange },
		{ path: "/budget", label: "Budget", icon: TbTarget },
		{ path: "/analytics", label: "Analytics", icon: TbChartLine },
	];

	return (
		<>
			{/* Sidebar */}
			<aside
				className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 shadow-md transition-all duration-300 ease-in-out overflow-y-auto ${
					isOpen ? "w-64" : "w-20"
				}`}
			>
				{/* Sidebar Header */}
				<div className="h-20 px-4 flex items-center border-b border-gray-200 justify-center">
					<div className="flex items-center gap-3">
						<span className="text-2xl">💰</span>
						{isOpen && <span className="font-semibold text-gray-900">ExpenseIQ</span>}
					</div>
				</div>

				{/* Navigation Items */}
				<nav className="flex-1 py-4 px-0">
					<ul className="flex flex-col gap-2">
						{navItems.map(({ path, label, icon: Icon }) => (
							<li key={path} className="px-2">
								<NavLink
									to={path}
									className={({ isActive }) =>
										`flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
											isActive
												? "bg-blue-100 text-blue-600 font-semibold"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
										}`
									}
									title={!isOpen ? label : ""}
								>
									{({ isActive }) => (
										<>
											{isActive && (
												<div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
											)}
											<Icon size={24} className="flex-shrink-0" />
											{isOpen && (
												<span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
													{label}
												</span>
											)}
										</>
									)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				{/* Sidebar Footer */}
				<div className="px-2 py-4 border-t border-gray-200 flex justify-center">
					<button
						onClick={toggleSidebar}
						className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:border-blue-600 transition-all duration-200 active:scale-95 flex items-center justify-center font-medium"
						title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
						aria-label="Toggle sidebar"
					>
						{isOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
					</button>
				</div>
			</aside>

			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Mobile Toggle Button */}
			<button
				onClick={toggleSidebar}
				className="fixed top-4 left-4 z-50 hidden md:hidden w-10 h-10 bg-white border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-100 hover:border-blue-600 transition-all duration-200 items-center justify-center"
				aria-label="Toggle navigation"
			>
				{isOpen ? <TbX size={24} /> : <TbMenu2 size={24} />}
			</button>
		</>
	);
}

export default Sidebar;
