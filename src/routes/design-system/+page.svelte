<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import UpdatedDate from '$lib/components/UpdatedDate.svelte';
	import { onMount } from 'svelte';

	let palette = [];

	onMount(() => {
		const root = getComputedStyle(document.documentElement);
		const vars = [
			'--backgroundColor',
			'--white',
			'--accentColor',
			'--textColor',
			'--accentColorThree',
			'--accentColorFour',
			'--darkColor'
		];
		palette = vars.map((v) => ({
			name: v,
			value: root.getPropertyValue(v).trim()
		}));
	});
	const samplePost = {
		path: '#',
		title: 'The Future of Web Design in 2026',
		date: '2026-05-01',
		mainImg: 'https://picsum.photos/id/101/400/200',
		description:
			'Exploring the new frontiers of spatial UI and agentic AI in modern web applications.'
	};
</script>

<svelte:head>
	<title>Design System | Tyler Merry</title>
</svelte:head>

<div class="ds-container">
	<section class="ds-section">
		<h2>Color Palette</h2>
		<div class="palette-grid">
			{#each palette as color}
				<div class="palette-item item-boxshadow">
					<div class="swatch" style="background-color: var({color.name})"></div>
					<div class="color-info">
						<span class="color-name">{color.name}</span>
						<code class="color-value">{color.value}</code>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="ds-section">
		<h2>Typography</h2>
		<div class="ds-preview typography-preview">
			<div class="font-group">
				<h4 class="font-label">Accent Font: Playfair Display</h4>
				<h1 class="playfair-display-regular">Heading 1 - The quick brown fox</h1>
				<p class="playfair-display-regular">This is the accent font used for logos and primary headers.</p>
			</div>

			<div class="font-group" style="margin-top: 2rem; border-top: 1px solid var(--white); padding-top: 2rem;">
				<h4 class="font-label">Primary Font: Mona Sans</h4>
				<h2>Heading 2 - The quick brown fox</h2>
				<h3>Heading 3 - The quick brown fox</h3>
				<h4>Heading 4 - The quick brown fox</h4>
				<p>
					Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					<strong>Bold text looks like this.</strong>
					<a href="#">Links look like this.</a>
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
			</div>

			<blockquote>
				"Design is not just what it looks like and feels like. Design is how it works."
			</blockquote>
		</div>
	</section>

	<section class="ds-section">
		<h2>Buttons</h2>
		<div class="ds-preview button-preview">
			<Button variant="primary" href="#">Primary Button</Button>
			<Button variant="outline" href="#">Outline Button</Button>
			<Button variant="text" href="#">Text Link</Button>
		</div>
	</section>

	<section class="ds-section">
		<h2>Post & Work Cards</h2>
		<div class="ds-preview card-preview">
			<h3>Home Variant</h3>
			<div class="card-grid">
				<PostCard {...samplePost} variant="home" />
			</div>

			<h3>Work Variant</h3>
			<PostCard {...samplePost} variant="work" />

			<h3>Default (Blog) Variant</h3>
			<PostCard {...samplePost} variant="default" />
		</div>
	</section>

	<section class="ds-section">
		<h2>Navigation Components</h2>
		<div class="ds-preview nav-preview">
			<h3>Header</h3>
			<div class="component-wrap">
				<Header />
			</div>
			<h3>Footer</h3>
			<div class="component-wrap">
				<Footer />
			</div>
		</div>
	</section>

	<section class="ds-section">
		<h2>Other Patterns</h2>
		<div class="ds-preview">
			<h3>Hipster Spacer</h3>
			<div class="hipster-spacer"></div>

			<h3>Updated Date</h3>
			<UpdatedDate date="2026-05-01" />
		</div>
	</section>
</div>

<style>
	.ds-container {
		max-width: 1000px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.ds-section {
		margin-bottom: 4rem;
	}

	.ds-section h2 {
		border-bottom: 2px solid var(--accentColor);
		padding-bottom: 0.5rem;
		margin-bottom: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.1rem;
	}

	.ds-preview {
		padding: 2rem;
		border-radius: 0;
		border: 1px solid var(--white);
	}

	.palette-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.5rem;
	}

	.palette-item {
		background: #fff;
		border-radius: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.swatch {
		height: 100px;
		width: 100%;
		border-bottom: 1px solid #eee;
	}

	.color-info {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.color-name {
		font-weight: 800;
		font-size: 0.85rem;
		color: #1a1a1a;
	}

	.color-value {
		font-size: 0.75rem;
		color: #666;
		background: #f5f5f5;
		padding: 2px 6px;
		border-radius: 0;
		width: fit-content;
	}

	.button-preview {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.card-grid {
		display: flex;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.component-wrap {
		border: 1px dashed #ccc;
		padding: 1rem;
		background: var(--backgroundColor);
	}

	.typography-preview blockquote {
		margin: 1.5rem 0;
	}

	.font-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		color: var(--accentColorThree);
		margin-bottom: 1rem;
	}
</style>
