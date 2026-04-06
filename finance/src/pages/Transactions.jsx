import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TransactionCard from "../components/TransactionCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { useFinance } from "../context/FinanceContext";

function Transactions() {
	const { transactions, deleteTransaction } = useFinance();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [sortOption, setSortOption] = useState("date");

	// Extract unique categories from transactions
	const uniqueCategories = useMemo(() => {
		const categories = transactions
			.map((transaction) => transaction.category)
			.filter((category) => category)
			.filter((category, index, self) => self.indexOf(category) === index)
			.sort();
		return categories;
	}, [transactions]);

	// Apply search, filter, and sort in the correct order
	const finalTransactions = useMemo(() => {
		// Step 1: Search (by title and notes)
		const searchFiltered = transactions.filter((transaction) => {
			const normalizedQuery = searchQuery.trim().toLowerCase();

			if (!normalizedQuery) {
				return true;
			}

			const title = (transaction.title ?? "").toLowerCase();
			const notes = (transaction.notes ?? "").toLowerCase();

			return title.includes(normalizedQuery) || notes.includes(normalizedQuery);
		});

		// Step 2: Filter by category
		const categoryFiltered = searchFiltered.filter((transaction) => {
			if (!selectedCategory) {
				return true;
			}
			return transaction.category === selectedCategory;
		});

		// Step 3: Filter by type
		const typeFiltered = categoryFiltered.filter((transaction) => {
			if (!selectedType) {
				return true;
			}
			return transaction.type === selectedType;
		});

		// Step 4: Sort
		const sorted = [...typeFiltered].sort((a, b) => {
			if (sortOption === "date") {
				const dateA = a.date ? new Date(a.date).getTime() : 0;
				const dateB = b.date ? new Date(b.date).getTime() : 0;
				return dateB - dateA; // newest first
			} else if (sortOption === "amount") {
				const amountA = Number(a.amount) || 0;
				const amountB = Number(b.amount) || 0;
				return amountB - amountA; // highest first
			} else if (sortOption === "category") {
				const catA = (a.category ?? "").toLowerCase();
				const catB = (b.category ?? "").toLowerCase();
				return catA.localeCompare(catB); // A-Z
			}
			return 0;
		});

		return sorted;
	}, [transactions, searchQuery, selectedCategory, selectedType, sortOption]);

	return (
		<div className="fi-page space-y-5">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h2 className="fi-title">Transactions</h2>
				<Link to="/transactions/new" className="fi-btn-primary">
					Add Transaction
				</Link>
			</div>

			{/* Search Component */}
			<SearchBar onSearchChange={setSearchQuery} />

			{/* Filter and Sort Component */}
			<Filters
				categories={uniqueCategories}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				selectedType={selectedType}
				onTypeChange={setSelectedType}
				sortOption={sortOption}
				onSortChange={setSortOption}
			/>

			{/* Transactions Display */}
			{transactions.length === 0 ? (
				<div className="fi-card">
					<p className="text-sm text-gray-600">No transactions yet. Add your first transaction.</p>
				</div>
			) : finalTransactions.length === 0 ? (
				<div className="fi-card">
					<p className="text-sm text-gray-600">No transactions match your search or filters.</p>
				</div>
			) : (
				<div className="space-y-3">
					{finalTransactions.map((transaction) => (
						<TransactionCard
							key={transaction.id}
							transaction={transaction}
							onDelete={deleteTransaction}
						/>
					))}
				</div>
			)}
		</div>
	);
}
export default Transactions;
