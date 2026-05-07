<script>
	import UpdatedDate from './UpdatedDate.svelte';
	export let path = '';
	export let title = '';
	export let date = '';
	export let mainImg = '';
	export let description = '';
	export let variant = 'default'; // 'default', 'home', 'work'
</script>

{#if variant === 'home'}
	<article class="post-card post-card--home item-boxshadow">
		<div
			class="post-card-image"
			style="background-image: url({mainImg || 'https://picsum.photos/id/472/400/200'})"
		></div>
		<div class="post-card-content">
			<h4>
				<a href={path}>{title}</a>
			</h4>
			<p><a href={path}>Read more</a></p>
		</div>
	</article>
{:else if variant === 'work'}
	<div class="post-card post-card--work item-boxshadow">
		<div class="post-card-image-container" style="background-image: url('{mainImg}')"></div>
		<div class="post-card-content">
			<h2 class="post-card-header">
				<a href={path}>{title}</a>
			</h2>
			{#if description}
				<p>{description}</p>
			{/if}
		</div>
	</div>
{:else}
	<div class="post-card post-card--default item-boxshadow">
		<h2>
			<a href={path}>{title}</a>
		</h2>
		{#if date}
			<span class="publish-date">Published <UpdatedDate {date} /></span>
		{/if}
	</div>
{/if}

<style>
	.post-card {
		border-radius: 0;
		overflow: hidden;
		border: 1px solid var(--accentColor);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.post-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.post-card a {
		text-decoration: none;
		color: inherit;
	}

	.post-card a:hover {
		color: var(--accentColor);
	}

	/* Home Variant */
	.post-card--home {
		flex: 1 1 300px;
		margin: 0 20px 40px 20px;
	}

	.post-card--home .post-card-image {
		height: 200px;
		background-size: cover;
		background-position: center;
	}

	.post-card--home .post-card-content {
		padding: 15px;
	}

	/* Work Variant */
	.post-card--work {
		display: flex;
		margin-bottom: 10px;
		align-items: stretch;
	}

	.post-card--work .post-card-image-container {
		width: 300px;
		background-size: cover;
		background-position: center;
		min-height: 150px;
	}

	.post-card--work .post-card-content {
		padding: 10px 15px;
		flex: 1;
	}

	@media (max-width: 750px) {
		.post-card--work {
			flex-direction: column;
		}
		.post-card--work .post-card-image-container {
			width: 100%;
			height: 150px;
		}
	}

	/* Default Variant */
	.post-card--default {
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.post-card--default h2 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	.publish-date {
		font-size: 0.9rem;
		color: #666;
	}
</style>
