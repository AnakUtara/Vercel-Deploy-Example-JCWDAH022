"use client"; // Error boundaries must be Client Components

import axios from "axios";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className="container mx-auto p-4">
			<h2>Something went wrong!</h2>
			<p>
				{axios.isAxiosError(error)
					? error?.response?.data?.error?.message
					: error.message}
			</p>
			<button
				className="btn btn-error"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
}
