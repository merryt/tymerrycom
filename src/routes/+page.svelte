<script>
	import windowScrollPosition from '$lib/windowScrollPosition.js';
	import { glitchEffect } from '$lib/glitchEffect.js';
	import PostCard from '$lib/components/PostCard.svelte';
	import Button from '$lib/components/Button.svelte';
	export let data;
	let { posts, caseStudies } = data;
	let y;
</script>

<svelte:window bind:scrollY={y} />

<div class="home">
	<div class="home--hero">
		<h4 class="home--hero-sub-header playfair-display-regular">
			<span>Design</span><span class="home--hero-sub-header-divider">•</span><span>Product</span
			><span class="home--hero-sub-header-divider">•</span><span>Development</span>
		</h4>
		<h2>Technology based<br />problem solver</h2>
		<h3>I am not special but you make me feel that way, thanks for checking me out!</h3>
	</div>


	<div class="home--info">
		<div>
			<h3>What do I do?</h3>
			<div class="hipster-spacer"></div>
			<p>
				I like to help people, the way I normally do that is through building easy to use websites
				that help people solve a problems. With experience doing design, fullstack development and
				product management, I am able to see projects from a systems level view and help deliver a
				complete solution.
			</p>
			<p>
				Outside of tech I love volenteering with a veriety of groups that teach programming to kids,
				keep trails and natural spaces open to the public, prevent fires, and increasing access to
				bikes.
			</p>
		</div>
		<canvas use:glitchEffect class="home--info-photo" style=""></canvas>
	</div>

	<div class="home--case-studies">
		<h3>Previous Work</h3>
		<div class="hipster-spacer"></div>
		<div class="home--case-studies-content">
			{#each caseStudies as caseStudy, i}
				{@const progress = i * (100 / Math.max(1, caseStudies.length - 1))}
				{@const effectiveScroll = Math.max(0, y - 375)}
				{@const scrollRatio = Math.min(1, effectiveScroll / 375)}
				{@const currentProgress = progress + (50 - progress) * scrollRatio}
				<div
					class="case-study-item"
					style="width: fit-content; margin-left: {currentProgress}%; transform: translateX(-{currentProgress}%);"
				>
					<h4>
						<a href={caseStudy.path} class="case-study-link">
							<span class="company-name-pre2">{caseStudy.meta.title}</span>
							<span class="company-name-pre1">{caseStudy.meta.title}</span>
							{#if caseStudy.meta.whiteLogo}
								<span style="display: inline-flex; align-items: center; gap: 12px;">
									<span class="company-logo" style="--logo-url: url('{caseStudy.meta.whiteLogo}');">
										<img src={caseStudy.meta.whiteLogo} alt="{caseStudy.meta.title} logo" />
									</span>
									{#if caseStudy.meta.showTextWithLogo}
										<span>{caseStudy.meta.title}</span>
									{/if}
								</span>
							{:else}
								{caseStudy.meta.title}
							{/if}
							<span class="company-name-post1">{caseStudy.meta.title}</span>
							<span class="company-name-post2">{caseStudy.meta.title}</span>
						</a>
					</h4>
				</div>
			{/each}
		</div>
	</div>

	<div class="home--posts-header">
		<h3>My Writings</h3>
		<div class="hipster-spacer"></div>
	</div>

	<div class="home--posts">
		{#each posts.slice(0, 3) as post}
			<PostCard
				path={post.path}
				title={post.meta.title}
				mainImg={post.meta.mainImg}
				variant="home"
			/>
		{/each}
	</div>

	<div class="view-all-container">
		<Button href="/blog" variant="outline">View all articles</Button>
	</div>
</div>

<style>
	.home--hero {
		width: 100%;
		margin: 0;
		padding-top: 100px;
		text-align: center;
	}
	@media only screen and (min-device-width: 500px) {
		.home--hero {
			margin: 0 0 58px 0;
		}
	}

	.home--hero h2 {
		font-weight: 700;
		font-size: 40px;
		line-height: 38px;
		margin: 10px 0;
		text-transform: uppercase;
		color: var(--white);
	}
	.home--hero h3 {
		margin-top: 0px;
		font-size: 18px;
		font-family: 'Playfair Display', serif;
		font-weight: 400;
	}
	h4.home--hero-sub-header {
		font-size: 18px;
		margin-top: 0;
		margin-bottom: 0;
		text-transform: uppercase;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.home--hero-sub-header .home--hero-sub-header-divider {
		margin-left: 10px;
		margin-right: 10px;
	}

	.hipster-spacer {
		min-height: 3px;
		width: 7%;
		background-color: #336699;
	}
	.home--info .hipster-spacer {
		background-color: var(--white);
	}
	.home--info {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		color: var(--white);
		box-sizing: border-box;
		border-top: 1px solid var(--accentColorFour);
		min-height: 375px;
	}
	.home--info > div {
		flex: 1.6;
		padding: 0 5% 0 10%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.home--info h3 {
		margin-top: 0;
		font-size: 28px;
	}

	.home--info p {
		font-size: 18px;
		line-height: 28px;
		margin-bottom: 20px;
	}
	.home--info-photo {
		flex: 1;
		cursor: crosshair;
	}

	@media (max-width: 700px) {
		.home--info-photo {
			display: none;
		}
		.home--info {
			padding-top: 5%;
			padding-bottom: 5%;
		}
	}
	.home--case-studies {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--white);
		background: var(--darkColor);
		box-sizing: border-box;
		padding: 100px 20px 80px 20px;
		overflow: hidden;
	}
	.home--case-studies h3 {
		margin-top: 0;
	}
	.home--case-studies .hipster-spacer {
		background-color: var(--white);
	}
	.home--case-studies-content {
		width: 100%;
		max-width: var(--desktop-container-width);
		margin-top: 10px;
	}
	.case-study-item {
		margin-bottom: 20px;
		text-align: left;
	}
	.case-study-item h4 {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
	}
	.case-study-item a {
		color: var(--white);
		text-decoration: none;
		font-size: 32px;
		font-weight: bold;
		transition: color 0.3s ease;
	}
	.case-study-item a:hover {
		color: var(--accentColor);
	}
	.company-logo {
		display: inline-block;
		vertical-align: middle;
		position: relative;
		transition: transform 0.3s ease;
		transform-origin: left center;
	}
	.company-logo img {
		max-height: 48px;
		width: auto;
		display: block;
		opacity: 0;
	}
	.company-logo::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--white);
		-webkit-mask-image: var(--logo-url);
		-webkit-mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		-webkit-mask-position: center left;
		mask-image: var(--logo-url);
		mask-size: contain;
		mask-repeat: no-repeat;
		mask-position: center left;
		transition: background-color 0.3s ease;
	}
	.company-name-pre2,
	.company-name-pre1,
	.company-name-post1,
	.company-name-post2 {
		position: absolute;
		font-weight: 900;
		text-transform: uppercase;
		color: var(--accentColorThree);
		top: 50%;
		left: 50%;
		white-space: nowrap;
		font-size: 60px;
		opacity: 10%;
	}
	.company-name-pre2 {
		transform: translate(calc(-50% - 400px), -50%);
	}
	.company-name-pre1 {
		transform: translate(calc(-50% - 980px), -50%);
	}
	.company-name-post1 {
		transform: translate(calc(-50% + 300px), -50%);
	}
	.company-name-post2 {
		transform: translate(calc(-50% + 820px), -50%);
	}
	.case-study-link:hover .company-logo {
		transform: scale(1.05);
	}
	.case-study-link:hover .company-logo::after {
		background-color: var(--accentColor);
	}
	.home--posts-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 60px;
		margin-bottom: 30px;
	}
	.home--posts-header h3 {
		margin-top: 0;
	}
	.home--posts {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.view-all-container {
		text-align: center;
		margin: 40px 0 60px 0;
	}

</style>
