import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import useBudget from "../hooks/useBudget";
import BudgetCard from "../components/BudgetCard";

function Budget() {
	const { transactions, budget, setBudget } = useFinance();
	const [value, setValue] = useState(budget || 0);
	const { totalExpenses, remainingBudget, percentageUsed, budgetStatus } = useBudget(transactions, budget);

	const onSubmit = (e) => {
		e.preventDefault();
		setBudget(Number(value || 0));
	};

	return (
		<div className="fi-page space-y-5">
			<h2 className="fi-title">Budget Planning</h2>

			{/* Budget Input Card */}
			<div className="fi-card">
				<form onSubmit={onSubmit} className="space-y-4">
					<div>
						<label htmlFor="budget-input" className="mb-2 block text-sm font-semibold text-gray-700">
							Set Monthly Budget
						</label>
						<div className="flex gap-2">
							<input
								id="budget-input"
								className="fi-input flex-1"
								type="number"
								value={value}
								onChange={(e) => setValue(Math.max(0, Number(e.target.value) || 0))}
								placeholder="Enter monthly budget"
								min="0"
								step="0.01"
							/>
							<button className="fi-btn-primary" type="submit">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>

			{/* Budget Overview Cards */}
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				<BudgetCard label="Monthly Budget" value={`₹${Number(budget || 0).toFixed(2)}`} type="default" />
				<BudgetCard label="Total Expenses" value={`₹${totalExpenses.toFixed(2)}`} type="expense" />
				<BudgetCard 
					label="Remaining" 
					value={`₹${remainingBudget.toFixed(2)}`} 
					type="remaining" 
					status={remainingBudget < 0 ? "negative" : "positive"}
				/>
				<BudgetCard label="Used" value={`${percentageUsed.toFixed(1)}%`} type="used" />
			</div>

			{/* Budget Progress Section */}
			{budget > 0 ? (
				<div className="fi-card">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
						<p className="font-semibold text-gray-900">Budget Usage</p>
						<p className="text-sm font-medium text-gray-600">
								₹{totalExpenses.toFixed(2)} of ₹{Number(budget || 0).toFixed(2)}
							</p>
						</div>

						{/* Progress Bar */}
<div className="h-6 overflow-hidden rounded-full bg-gray-300">
						<div
							className="h-full w-full transition-all duration-300 bg-blue-600"
								style={{ width: `${percentageUsed}%` }}
							/>
						</div>

						{/* Status Message */}
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<span
									className={`inline-block h-3 w-3 rounded-full ${
										budgetStatus === "safe" ? "bg-green-500" : budgetStatus === "warning" ? "bg-yellow-500" : "bg-red-500"
									}`}
								/>
								<span className="font-medium text-gray-700">
									{budgetStatus === "safe"
										? "✓ Good spending"
										: budgetStatus === "warning"
											? "⚠ Medium spending"
											: "⛔ High spending"}
								</span>
							</div>
							<span className="font-medium text-gray-600">{percentageUsed.toFixed(1)}% used</span>
						</div>
					</div>
				</div>
			) : (
				<div className="fi-card">
					<p className="text-center text-sm text-gray-600">Set a budget to start tracking expenses</p>
				</div>
			)}

			{/* Empty State */}
			{transactions.length === 0 && budget > 0 && (
				<div className="fi-card">
					<p className="text-center text-sm text-gray-600">No expenses recorded yet. Start adding transactions to track your budget.</p>
				</div>
			)}
		</div>
	);
}

export default Budget;
