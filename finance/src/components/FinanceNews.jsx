import { useEffect, useState } from "react";
import axios from "axios";
import { TbExternalLink } from "react-icons/tb";

const API_KEY = "bde5262310d14e9eb9f94d17930033c8"; // NewsAPI key
const API_URL = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${API_KEY}`;

function FinanceNews() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchNews = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(API_URL);
				// Limit to first 5-6 articles
				setArticles(response.data.articles.slice(0, 6));
			} catch (err) {
				setError(err.message || "Failed to fetch news");
				console.error("News fetch error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, []);

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-gray-900">Financial News</h3>

			{/* Loading State */}
			{loading && (
				<div className="flex items-center justify-center py-8">
					<div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-300 border-t-blue-600"></div>
					<p className="ml-3 text-sm text-gray-600">Loading latest news...</p>
				</div>
			)}

			{/* Error State */}
			{error && !loading && (
				<div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
					<p>⚠️ Unable to load news: {error}</p>
				</div>
			)}

			{/* Articles Grid */}
			{!loading && !error && articles.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{articles.map((article, index) => (
						<a
							key={index}
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
							className="fi-card group overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
						>
							{/* Article Image */}
							{article.urlToImage ? (
								<div className="mb-3 overflow-hidden rounded-lg">
									<img
										src={article.urlToImage}
										alt={article.title}
										className="h-40 w-full object-cover transition-transform group-hover:scale-110"
										onError={(e) => {
											e.target.style.display = "none";
										}}
									/>
								</div>
							) : (
								<div className="mb-3 flex h-40 items-center justify-center rounded-lg bg-blue-50">
									<p className="text-xs text-blue-600">No image available</p>
								</div>
							)}

							{/* Article Content */}
							<div className="flex flex-col gap-2">
								{/* Source Badge */}
								<div className="inline-flex w-fit rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
									{article.source?.name || "Unknown"}
								</div>

								{/* Title */}
								<h4 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
									{article.title}
								</h4>

								{/* Description */}
								<p className="line-clamp-2 text-xs text-gray-600">
									{article.description || "No description available"}
								</p>

								{/* Read More Link */}
								<div className="mt-auto flex items-center gap-1 pt-2 text-xs font-medium text-blue-600 group-hover:text-blue-700">
									Read More
									<TbExternalLink size={14} />
								</div>
							</div>
						</a>
					))}
				</div>
			)}

			{/* Empty State */}
			{!loading && !error && articles.length === 0 && (
				<div className="fi-card text-center">
					<p className="text-sm text-gray-600">No articles found</p>
				</div>
			)}
		</div>
	);
}

export default FinanceNews;
