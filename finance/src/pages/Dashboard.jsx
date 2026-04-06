import { Link } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import TransactionCard from "../components/TransactionCard";
import CurrencyConverter from "../components/CurrencyConverter";
import FinanceNews from "../components/FinanceNews";

function Dashboard() {
	const { transactions, budget } = useFinance();

	// Calculate income and expense
	const income = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + Number(t.amount || 0), 0);

	const expense = transactions
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + Number(t.amount || 0), 0);

	const netBalance = income - expense;

	// Calculate top spending category
	const categoryExpenses = transactions
		.filter((t) => t.type === "expense")
		.reduce((acc, t) => {
			const existing = acc.find((item) => item.category === t.category);
			if (existing) {
				existing.amount += Number(t.amount || 0);
			} else {
				acc.push({ category: t.category, amount: Number(t.amount || 0) });
			}
			return acc;
		}, [])
		.sort((a, b) => b.amount - a.amount);

	const topSpendingCategory = categoryExpenses.length > 0 ? categoryExpenses[0] : null;

	// Get last 5 transactions sorted by date (newest first)
	const recentTransactions = [...transactions]
		.sort((a, b) => new Date(b.date) - new Date(a.date))
		.slice(0, 5);

	return (
		<div className="fi-page space-y-8">
			{/* Header */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h2 className="fi-title">Finance Dashboard</h2>
				<p className="mt-1 text-sm text-gray-600">Welcome back! Here's your financial overview</p>
				</div>
				<Link to="/transactions/new" className="fi-btn-primary">
					+ Add Transaction
				</Link>
			</div>

			{/* Summary Cards Section */}
			<div>
				<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Key Metrics</h3>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{/* Total Income Card */}
					<div className="fi-card hover:shadow-lg transition-shadow duration-300">
						<div className="flex items-center justify-between">
							<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Total Income</p>
							<p className="mt-2 text-2xl font-bold text-green-600">₹{income.toFixed(2)}</p>
						</div>
						<div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center">
							<span className="text-xl font-bold text-green-600">↑</span>
							</div>
						</div>
					</div>

					{/* Total Expenses Card */}
					<div className="fi-card hover:shadow-lg transition-shadow duration-300">
						<div className="flex items-center justify-between">
							<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Total Expenses</p>
							<p className="mt-2 text-2xl font-bold text-red-600">₹{expense.toFixed(2)}</p>
						</div>
						<div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center">
							<span className="text-xl font-bold text-red-600">↓</span>
							</div>
						</div>
					</div>

					{/* Net Balance Card */}
					<div className="fi-card">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Net Balance</p>
								<p className={`mt-2 text-2xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
									₹{netBalance.toFixed(2)}
								</p>
							</div>
							<div className={`h-12 w-12 rounded-lg flex items-center justify-center ${netBalance >= 0 ? "bg-green-50" : "bg-red-50"}`}>
								<span className={`text-xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
									{netBalance >= 0 ? "=" : "!"}
								</span>
							</div>
						</div>
					</div>

					{/* Top Spending Category Card */}
					<div className="fi-card hover:shadow-lg transition-shadow duration-300">
						<div className="flex items-center justify-between">
							<div>
							<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Top Category</p>
							{topSpendingCategory ? (
								<>
									<p className="mt-2 text-lg font-bold text-gray-900 capitalize">{topSpendingCategory.category}</p>
									<p className="text-sm text-gray-600">₹{topSpendingCategory.amount.toFixed(2)}</p>
								</>
							) : (
								<p className="mt-2 text-sm text-gray-500 italic">No expenses yet</p>
							)}
						</div>
						<div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
							<span className="text-xl font-bold text-blue-600">#</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Transactions Section */}
			{recentTransactions.length > 0 && (
				<div>
					<div className="mb-4 flex items-center justify-between">
						<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">Recent Transactions</h3>
						<Link to="/transactions" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
							View All →
						</Link>
					</div>
					<div className="space-y-3">
						{recentTransactions.map((transaction) => (
							<TransactionCard key={transaction.id} transaction={transaction} showDelete={false} />
						))}
					</div>
				</div>
			)}

			{/* Two-Column Bottom Section: Converter & News */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Currency Converter - Left */}
				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Currency Tools</h3>
					<div className="fi-card">
						<CurrencyConverter />
					</div>
				</div>

				{/* Finance News - Right */}
				<div>
					<h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Financial News</h3>
					<FinanceNews />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
