import { useState } from "react";

export default function useCounter() {
	const [count, setCount] = useState<number>(0);

	const incr = () => setCount(count + 1);
	const decr = () => setCount(count - 1);

	return { count, incr, decr };
}
