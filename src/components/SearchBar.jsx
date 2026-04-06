import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";

function SearchBar({ onSearchChange }) {
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	useEffect(() => {
		onSearchChange(debouncedSearchQuery);
	}, [debouncedSearchQuery, onSearchChange]);

	return (
		<div className="fi-card">
			<label htmlFor="transactions-search" className="mb-2 block text-sm font-semibold text-gray-700">
				Search transactions
			</label>
			<input
				id="transactions-search"
				type="text"
				className="fi-input"
				placeholder="Search by title or notes"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	);
}

export default SearchBar;
