<script context="module">
	export const load = async ({ fetch }) => {
		const posts = await fetch('api/blog.json');
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

{#each posts as post}
	<div class="post">
		<h2>
			<a href={post.path}>
				{post.meta.title}
			</a>
		</h2>
		Published {post.meta.date}
	</div>
{/each}

<style>
	.post {
		border-bottom: 1px solid rgba(0, 0, 0, 0.5);
		margin-bottom: 10px;
		padding-bottom: 10px;
	}
	.post:last-of-type {
		border-bottom: none;
	}
</style>
