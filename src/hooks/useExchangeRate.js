import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Custom hook for currency conversion
 * Fetches exchange rates from exchangerate-api.com
 */
function useExchangeRate(baseCurrency) {
	const [rates, setRates] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchRates = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
				setRates(response.data.rates || {});
			} catch (err) {
				setError(err.message || "Failed to fetch exchange rates");
				console.error("Exchange rate fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		if (baseCurrency) {
			fetchRates();
		}
	}, [baseCurrency]);

	return { rates, loading, error };
}

export default useExchangeRate;
