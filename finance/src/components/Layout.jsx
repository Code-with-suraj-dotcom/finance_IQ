import Sidebar from "./Sidebar/Sidebar";
import { useUI } from "../context/UIContext";

function Layout({ children }) {
	const { isSidebarOpen } = useUI();

	return (
		<div className="flex h-screen bg-white">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Content */}
			<main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out bg-white ${
				isSidebarOpen ? "ml-64" : "ml-20"
			}`}>
				<div className="min-h-screen p-8">
					{children}
				</div>
			</main>
		</div>
	);
}

export default Layout;
