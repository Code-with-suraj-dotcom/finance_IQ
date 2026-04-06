import { useFinance } from "../context/FinanceContext";
import useAnalytics from "../hooks/useAnalytics";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Color palette for charts - professional fintech theme
const COLORS = ["#3b82f6", "#10b981", "#ef4444", "#6366f1", "#f59e0b", "#8b5cf6", "#06b6d4", "#84cc16"];

function Analytics() {
	const { transactions } = useFinance();
	const { totalIncome, totalExpenses, netBalance, categoryData, monthlyData, monthlyTrendData } = useAnalytics(transactions);

	// Custom tooltip for better readability
	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="rounded bg-gray-800 p-2 text-sm text-white shadow-lg">
					<p>{`₹${Number(payload[0].value).toFixed(2)}`}</p>
				</div>
			);
		}
		return null;
	};

	const BarTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="rounded bg-gray-800 p-2 text-sm text-white shadow-lg">
					{payload.map((entry, index) => (
						<p key={index}>
							{entry.name}: ₹{Number(entry.value).toFixed(2)}
						</p>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<div className="fi-page space-y-5">
			<h2 className="fi-title">Analytics Dashboard</h2>

			{/* Section 1: Summary Cards */}
			{transactions.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-3">
					<div className="fi-card">
						<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Total Income</p>
						<p className="mt-2 text-3xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</p>
					</div>
					<div className="fi-card">
						<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Total Expenses</p>
						<p className="mt-2 text-3xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
					</div>
					<div className="fi-card">
						<p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Net Balance</p>
						<p className={`mt-2 text-3xl font-bold ${netBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
							₹{netBalance.toFixed(2)}
						</p>
					</div>
				</div>
			) : (
				<div className="fi-card">
					<p className="text-center text-sm text-gray-600">No transactions yet. Add some to see analytics.</p>
				</div>
			)}

			{/* Section 2: Category-wise Spending (Pie Chart) */}
			{categoryData.length > 0 && (
				<div className="fi-card">
					<h3 className="mb-4 text-lg font-semibold text-gray-900">Category-wise Spending</h3>
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={categoryData}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ name, value }) => `${name}: ₹${value.toFixed(0)}`}
								outerRadius={100}
								fill="#8884d8"
								dataKey="value"
							>
								{categoryData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
						</PieChart>
					</ResponsiveContainer>
				</div>
			)}

			{/* Section 3: Monthly Spending Trend (Line Chart) */}
			{monthlyTrendData.length > 0 && (
				<div className="fi-card">
					<h3 className="mb-4 text-lg font-semibold text-gray-900">Monthly Spending Trend</h3>
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={monthlyTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis dataKey="month" stroke="#6b7280" />
							<YAxis stroke="#6b7280" />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Line
								type="monotone"
								dataKey="amount"
								name="Expense"
								stroke="#ef4444"
								strokeWidth={2}
								dot={{ fill: "#ef4444", r: 5 }}
								activeDot={{ r: 7 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)}

			{/* Section 4: Income vs Expense (Bar Chart) */}
			{monthlyData.length > 0 && (
				<div className="fi-card">
					<h3 className="mb-4 text-lg font-semibold text-gray-900">Monthly Income vs Expense</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis dataKey="month" stroke="#9ca3af" />
							<YAxis stroke="#9ca3af" />
							<Tooltip content={<BarTooltip />} />
							<Legend />
							<Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
							<Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[8, 8, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			)}
		</div>
	);
}

export default Analytics;
