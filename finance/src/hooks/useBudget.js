import { useMemo } from "react";

/**
 * Custom hook for budget calculations
 * Returns: totalExpenses, remainingBudget, percentageUsed, budgetStatus
 */
function useBudget(transactions, budget) {
	return useMemo(() => {
		// Calculate total expenses
		const totalExpenses = transactions.reduce((sum, transaction) => {
			return transaction.type === "expense" ? sum + Number(transaction.amount || 0) : sum;
		}, 0);

		// Calculate remaining budget
		const remainingBudget = budget - totalExpenses;

		// Calculate percentage used (avoid division by zero)
		const percentageUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

		// Determine status based on percentage
		let budgetStatus = "safe"; // < 50%
		if (percentageUsed >= 50 && percentageUsed < 80) {
			budgetStatus = "warning"; // 50-80%
		} else if (percentageUsed >= 80) {
			budgetStatus = "danger"; // >= 80%
		}

		return {
			totalExpenses: Math.round(totalExpenses * 100) / 100,
			remainingBudget: Math.round(remainingBudget * 100) / 100,
			percentageUsed: Math.min(percentageUsed, 100), // Cap at 100%
			budgetStatus,
		};
	}, [transactions, budget]);
}

export default useBudget;
