<script context="module">
	export const load = async ({ fetch }) => {
		const posts = await fetch('api/work.json');
		const allPosts = await posts.json();
		return {
			props: {
				posts: allPosts
			}
		};
	};
</script>

<script>
	export let posts;
</script>

<h1>Blog</h1>

<ul>
	{#each posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			<img src={post.meta.mainImg} alt={post.meta.title} />
		</li>
	{/each}
</ul>

<style>
	img {
		width: 200px;
	}
</style>
