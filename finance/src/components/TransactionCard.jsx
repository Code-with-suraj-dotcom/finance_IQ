import { TbRepeat } from "react-icons/tb";

function TransactionCard({ transaction, onDelete, showDelete = true }) {
	const sign = transaction.type === "expense" ? "-" : "+";
	const isRecurring = transaction.recurring === true;

	return (
		<div
			className={`fi-card transition-all duration-200${
				isRecurring ? " border-blue-200 bg-blue-50" : ""
			}`}
		>
			<div className="flex items-start justify-between gap-3">
				{/* Left Section - Title & Details */}
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<h3 className="text-base font-semibold text-gray-900">{transaction.title}</h3>
						{isRecurring && (
							<span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
								<TbRepeat size={14} />
								Recurring
							</span>
						)}
					</div>
					<p className="mt-1 text-sm text-gray-600">
						{transaction.category} • {transaction.date}
					</p>
				</div>

				{/* Right Section - Amount & Delete */}
				<div className="text-right">
					<p
						className={`mb-2 text-lg font-extrabold ${
							transaction.type === "expense" ? "text-red-600" : "text-green-600"
						}`}
					>
						{sign}₹{Number(transaction.amount).toFixed(2)}
					</p>
					{showDelete && (
						<button className="fi-btn-ghost" type="button" onClick={() => onDelete?.(transaction.id)}>
							Delete
						</button>
					)}
				</div>
			</div>

			{/* Notes Section */}
			{transaction.notes ? <p className="mt-2 text-sm text-gray-600">{transaction.notes}</p> : null}
		</div>
	);
}

export default TransactionCard;
