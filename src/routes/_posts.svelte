<script>
	export let title;
	export let date;
	export let mainImg;
	import UpdatedDate from '$lib/components/UpdatedDate.svelte';
</script>

{#if mainImg}
	<div class="hero">
		<img src={mainImg} alt={title} />
	</div>
{/if}
<div class="article-page item-boxshadow">
	<div class="article-date"><UpdatedDate {date} /></div>

	<h1>{title}</h1>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.content img {
		max-width: 100%;
	}
</style>
