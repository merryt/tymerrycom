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

<div class="work-items">
	{#each posts as post}
		<div class="work-item">
			<div>
				<div class="work-item-img-container" style="background-image: url('{post.meta.mainImg}')">
					<!-- <img src={post.meta.mainImg} alt={post.meta.title} class="work-item-img" /> -->
				</div>
			</div>
			<div class="work-item-content">
				<h2 class="work-item-header">
					<a href={post.path}>
						{post.meta.title}
					</a>
				</h2>
				<p>{post.meta.description}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.work-item {
		display: flex;
		margin-bottom: 10px;
		align-items: stretch;
		border-radius: 6px;
		border: 1px solid #333;
		overflow: hidden;
	}
	.work-item-img-container {
		width: 300px;
		background-size: cover;
		height: 100%;
	}

	.work-item-img {
		width: 300px;
	}
	.work-item-content {
		margin-left: 10px;
	}
	.work-item-header {
		line-height: 2rem;
		margin: 0;
	}
	.work-item-header > a {
		text-decoration: none;
		font-size: 2rem;
	}
</style>
