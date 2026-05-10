<script>
	export let data;
	let { posts } = data;
	import PostCard from '$lib/components/PostCard.svelte';
</script>

<div class="work-items">
	{#each posts as post}
		<PostCard
			path={post.path}
			title={post.meta.title}
			mainImg={post.meta.mainImg}
			description={post.meta.description}
			variant="work"
		/>
	{/each}
</div>

<style>
	.work-item {
		display: flex;
		margin-bottom: 10px;
		align-items: stretch;
		border-radius: 6px;
		background-color: var(--lightColor);
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
