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
	import UpdatedDate from '$lib/components/UpdatedDate.svelte';
</script>

<h1>Blog</h1>

{#each posts as post}
	<div class="post item-boxshadow">
		<h2>
			<a href={post.path}>
				{post.meta.title}
			</a>
		</h2>
		Published <UpdatedDate date={post.meta.date} />
	</div>
{/each}

<style>
	.post {
		padding: 5px 10px 10px 10px;
		margin-bottom: 10px;
	}
</style>
