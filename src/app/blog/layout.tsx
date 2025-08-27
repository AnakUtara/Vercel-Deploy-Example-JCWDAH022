import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};
const BlogLayout = ({ children }: Props) => {
	return (
		<div>
			<h1 className="p-4 bg-black text-white">Blog Layout</h1>
			{children}
		</div>
	);
};
export default BlogLayout;
