import { useState } from "react";
import useExchangeRate from "../hooks/useExchangeRate";
import { TbArrowsUpDown } from "react-icons/tb";

function CurrencyConverter() {
	const [baseCurrency, setBaseCurrency] = useState("USD");
	const [targetCurrency, setTargetCurrency] = useState("INR");
	const [amount, setAmount] = useState(1);
	const { rates, loading, error } = useExchangeRate(baseCurrency);

	// Calculate converted amount
	const convertedAmount = amount && rates[targetCurrency] ? Number(amount) * rates[targetCurrency] : 0;

	// Swap currencies
	const handleSwapCurrencies = () => {
		setBaseCurrency(targetCurrency);
		setTargetCurrency(baseCurrency);
	};

	// Common currencies list
	const populateCurrencies = Object.keys(rates).sort();

	return (
		<div className="fi-card">
			<h3 className="mb-4 text-lg font-semibold text-gray-900">Currency Converter</h3>

			{/* Error Handling */}
			{error && (
				<div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
					<p>⚠️ {error}</p>
				</div>
			)}

			{/* Converter UI */}
			<div className="space-y-4">
				{/* Amount Input */}
				<div>
					<label htmlFor="amount" className="mb-2 block text-sm font-semibold text-gray-700">
						Amount
					</label>
					<input
						id="amount"
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter amount"
						className="fi-input"
						min="0"
						step="0.01"
					/>
				</div>

				{/* Base and Target Currency Selection */}
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-end">
					{/* Base Currency */}
					<div>
						<label htmlFor="base-currency" className="mb-2 block text-sm font-semibold text-gray-700">
							From
						</label>
						<select
							id="base-currency"
							value={baseCurrency}
							onChange={(e) => setBaseCurrency(e.target.value)}
							className="fi-input"
							disabled={loading}
						>
							<option value="USD">USD - US Dollar</option>
							<option value="EUR">EUR - Euro</option>
							<option value="GBP">GBP - British Pound</option>
							<option value="INR">INR - Indian Rupee</option>
							<option value="JPY">JPY - Japanese Yen</option>
							<option value="AUD">AUD - Australian Dollar</option>
							<option value="CAD">CAD - Canadian Dollar</option>
							<option value="SGD">SGD - Singapore Dollar</option>
							<option value="CNY">CNY - Chinese Yuan</option>
							<option value="AED">AED - UAE Dirham</option>
						</select>
					</div>

					{/* Swap Button */}
					<div className="flex justify-center">
						<button
							onClick={handleSwapCurrencies}
							className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-all hover:bg-blue-200 hover:text-blue-700"
							title="Swap currencies"
							disabled={loading}
						>
							<TbArrowsUpDown size={20} />
						</button>
					</div>

					{/* Target Currency */}
					<div>
						<label htmlFor="target-currency" className="mb-2 block text-sm font-semibold text-gray-700">
							To
						</label>
						<select
							id="target-currency"
							value={targetCurrency}
							onChange={(e) => setTargetCurrency(e.target.value)}
							className="fi-input"
							disabled={loading}
						>
							{populateCurrencies.map((currency) => (
								<option key={currency} value={currency}>
									{currency}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Result Display */}
				<div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
					{loading ? (
						<div className="flex items-center justify-center py-4">
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-300 border-t-blue-600"></div>
							<p className="ml-2 text-sm text-gray-600">Fetching rates...</p>
						</div>
					) : (
						<>
							<p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Converted Amount</p>
							<p className="mt-2 text-3xl font-bold text-gray-900">
								{convertedAmount.toFixed(2)} <span className="text-lg text-gray-700">{targetCurrency}</span>
							</p>
							<p className="mt-2 text-xs text-gray-600">
								{amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default CurrencyConverter;
