import Link from "next/link";

async function getBlogPost(slug: string) {
	const res = await fetch(`https://dummyjson.com/posts/${slug}`);
	return await res.json();
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const blog = await getBlogPost(slug);
	return {
		title: blog?.title,
		description: `Read the blog post: ${blog?.title}`,
	};
}

type Props = {
	params: Promise<{ slug: string }>;
};
const BlogPost = async ({ params }: Props) => {
	const { slug } = await params;
	const blog = await getBlogPost(slug);

	return (
		<div className="container mx-auto p-8">
			<div className="flex gap-4 items-center">
				<Link className="btn btn-outline btn-sm mb-4" href="/blog">
					{"<"}
				</Link>
				<h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
			</div>
			<p>{blog?.body}</p>
		</div>
	);
};
export default BlogPost;
