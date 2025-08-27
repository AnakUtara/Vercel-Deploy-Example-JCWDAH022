import { useState } from "react";

export const usePasswordMask = () => {
	const [visibility, setVisibility] = useState<boolean>(false);
	const toggleMask = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setVisibility((prev) => !prev);
	};
	return { visibility, toggleMask };
};
