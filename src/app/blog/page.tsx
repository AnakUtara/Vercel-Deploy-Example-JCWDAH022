import Link from "next/link";

export const metadata = {
	title: "Blog",
	description: "Blog page",
};

async function BlogPage() {
	const res = await fetch("https://dummyjson.com/posts");
	const { posts: blogs } = await res.json();

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				{blogs?.map((blog: { id: number; title: string; body: string }) => (
					<div key={blog?.id} className="card shadow-sm">
						<div className="card-body">
							<Link
								href={`/blog/${blog?.id}`}
								className="card-title transition-all duration-200 hover:text-amber-400"
							>
								{blog?.title}
							</Link>
							<p>{blog?.body}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
export default BlogPage;
