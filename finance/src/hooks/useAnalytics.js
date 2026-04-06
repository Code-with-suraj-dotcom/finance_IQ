import { useMemo } from "react";

/**
 * Custom hook for analytics calculations
 * Returns all data needed for charts
 */
function useAnalytics(transactions) {
	return useMemo(() => {
		// 1. Basic Metrics
		const totalIncome = transactions.reduce((sum, t) => {
			return t.type === "income" ? sum + Number(t.amount || 0) : sum;
		}, 0);

		const totalExpenses = transactions.reduce((sum, t) => {
			return t.type === "expense" ? sum + Number(t.amount || 0) : sum;
		}, 0);

		const netBalance = totalIncome - totalExpenses;

		// 2. Category-wise Spending (Pie Chart Data)
		const categoryData = transactions
			.filter((t) => t.type === "expense")
			.reduce((acc, transaction) => {
				const category = transaction.category || "Uncategorized";
				const existing = acc.find((item) => item.name === category);
				if (existing) {
					existing.value += Number(transaction.amount || 0);
				} else {
					acc.push({ name: category, value: Number(transaction.amount || 0) });
				}
				return acc;
			}, [])
			.sort((a, b) => b.value - a.value);

		// 3. Monthly Data (for Line & Bar Charts)
		const monthlyData = transactions
			.reduce((acc, transaction) => {
				// Extract month in YYYY-MM format
				const date = new Date(transaction.date);
				const month = date.toISOString().slice(0, 7); // "2026-01"

				const existing = acc.find((item) => item.month === month);
				if (existing) {
					if (transaction.type === "income") {
						existing.income += Number(transaction.amount || 0);
					} else {
						existing.expense += Number(transaction.amount || 0);
					}
				} else {
					acc.push({
						month,
						income: transaction.type === "income" ? Number(transaction.amount || 0) : 0,
						expense: transaction.type === "expense" ? Number(transaction.amount || 0) : 0,
					});
				}
				return acc;
			}, [])
			.sort((a, b) => a.month.localeCompare(b.month)); // Sort ascending

		// 4. Monthly Spending Trend (Line Chart - expenses only)
		const monthlyTrendData = monthlyData.map((item) => ({
			month: item.month,
			amount: Math.round(item.expense * 100) / 100,
		}));

		return {
			totalIncome: Math.round(totalIncome * 100) / 100,
			totalExpenses: Math.round(totalExpenses * 100) / 100,
			netBalance: Math.round(netBalance * 100) / 100,
			categoryData,
			monthlyData: monthlyData.map((item) => ({
				...item,
				income: Math.round(item.income * 100) / 100,
				expense: Math.round(item.expense * 100) / 100,
			})),
			monthlyTrendData,
		};
	}, [transactions]);
}

export default useAnalytics;
