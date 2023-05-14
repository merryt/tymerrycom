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

<div class="work-items">
	{#each posts as post}
		<div class="work-item item-boxshadow">
			<div>
				<div class="work-item-img-container" style="background-image: url('{post.meta.mainImg}')" />
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
		background-color: #fff;
		overflow: hidden;
		border: 1px solid #e5e5e5;
	}
	.work-item-img-container {
		width: 300px;
		background-size: cover;
		height: 100%;
	}
	@media (max-width: 750px) {
		.work-item {
			flex-direction: column;
		}
		.work-item-img-container {
			background-position: center;
			width: 100%;
			height: 100px;
		}
	}

	.work-item-content {
		margin-top: 10px;
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
