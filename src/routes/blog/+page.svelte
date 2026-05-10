<script>
	export let data;
	let { posts } = data;
	import PostCard from '$lib/components/PostCard.svelte';
</script>

<h1>Blog</h1>

{#each posts as post}
	<PostCard 
		path={post.path} 
		title={post.meta.title} 
		date={post.meta.date} 
		variant="default" 
	/>
{/each}


<style>
	.post {
		padding: 5px 10px 10px 10px;
		margin-bottom: 10px;
		border: 1px solid #e5e5e5;
		overflow: hidden;
	}
</style>
