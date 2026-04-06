function Filters({
	categories,
	selectedCategory,
	onCategoryChange,
	selectedType,
	onTypeChange,
	sortOption,
	onSortChange,
	showRecurringFilter = false,
	selectedRecurring = "",
	onRecurringChange,
}) {
	return (
		<div className="fi-card">
			<div className={`grid grid-cols-1 gap-4 ${showRecurringFilter ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
				{/* Category Filter */}
				<div>
					<label htmlFor="category-filter" className="mb-2 block text-sm font-semibold text-gray-700">
						Category
					</label>
					<select
						id="category-filter"
						className="fi-input"
						value={selectedCategory}
						onChange={(e) => onCategoryChange(e.target.value)}
					>
						<option value="">All Categories</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				{/* Type Filter */}
				<div>
					<label htmlFor="type-filter" className="mb-2 block text-sm font-semibold text-gray-700">
						Type
					</label>
					<select
						id="type-filter"
						className="fi-input"
						value={selectedType}
						onChange={(e) => onTypeChange(e.target.value)}
					>
						<option value="">All Types</option>
						<option value="income">Income</option>
						<option value="expense">Expense</option>
					</select>
				</div>

				{/* Sort Option */}
				<div>
					<label htmlFor="sort-option" className="mb-2 block text-sm font-semibold text-gray-700">
						Sort By
					</label>
					<select
						id="sort-option"
						className="fi-input"
						value={sortOption}
						onChange={(e) => onSortChange(e.target.value)}
					>
						<option value="date">Newest First</option>
						<option value="amount">Highest Amount</option>
						<option value="category">Category (A-Z)</option>
					</select>
				</div>

				{/* Recurring Filter - Optional */}
				{showRecurringFilter && (
					<div>
						<label htmlFor="recurring-filter" className="mb-2 block text-sm font-semibold text-gray-700">
							Recurring
						</label>
						<select
							id="recurring-filter"
							className="fi-input"
							value={selectedRecurring}
							onChange={(e) => onRecurringChange?.(e.target.value)}
						>
							<option value="">All</option>
							<option value="none">None</option>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
							<option value="yearly">Yearly</option>
						</select>
					</div>
				)}
			</div>
		</div>
	);
}

export default Filters;
