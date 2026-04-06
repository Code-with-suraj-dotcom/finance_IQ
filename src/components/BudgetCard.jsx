function BudgetCard({ label, value, type = "default", status = null }) {
	// Determine styling based on type
	let textColorLabel = "text-gray-600/70";
	let textColorValue = "text-gray-900";

	if (type === "expense") {
		textColorLabel = "text-red-600/70";
		textColorValue = "text-red-600";
	} else if (type === "remaining") {
		textColorLabel = "text-green-600/70";
		textColorValue = status === "negative" ? "text-red-600" : "text-green-600";
	} else if (type === "used") {
		textColorLabel = "text-gray-600/70";
		textColorValue = "text-gray-900";
	}

	return (
		<div className="fi-card">
			<p className={`text-xs font-semibold uppercase tracking-wide ${textColorLabel}`}>{label}</p>
			<p className={`mt-2 text-2xl font-bold ${textColorValue}`}>{value}</p>
		</div>
	);
}

export default BudgetCard;
