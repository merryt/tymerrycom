<script>
	import windowScrollPosition from '$lib/windowScrollPosition.js';
	export let data;
	let { posts, caseStudies } = data;
	let y;
</script>

<svelte:window bind:scrollY={y} />

<div class="home">
	<div class="home--hero">
		<h1>HEY!</h1>
		<h2 class="skinny">
			My name is <strong>Tyler</strong>,<br />
			I make things on the internet
		</h2>
		<h3>I am not special but you make me feel that way, thanks for checking me out!</h3>
	</div>
	<div class="home--images">
		<img
			src="/wireframes1.jpg"
			class="wireframes1"
			alt="Pen and paper wireframes can be useful to get ideas down fast!"
			style="transform: translateY({y / 10}px)"
		/>
		<img src="/climbing.jpg" class="climbing" alt="Tyler being a ham on a boat" />
		<img
			src="/golfcart.jpg"
			class="golfcart"
			alt="My friends and I like to get in trouble form time to time"
		/>
		<img
			src="/speaking1.jpeg"
			class="speaking1"
			alt="My friends and I like to get in trouble form time to time"
			style="transform: translateX(-{y / 10}px)"
		/>
	</div>

	<div class="home--info">
		<h3>What do I do?</h3>
		<div class="hipster-spacer"></div>
		<p>
			I like to help people, the way I normally do that is through building easy to use websites
			that help people solve a problem. I also like to help people fix their bikes and maintain
			hiking trails.
		</p>
		<p>
			Previously I spoke at conferences, and ran meetups in Denver. Now I try to help more one on
			one!
		</p>
	</div>

	<div class="home--case-studies">
		<h3>Previous Work</h3>
		<div class="hipster-spacer"></div>
		<div class="home--case-studies-content">
			{#each caseStudies as caseStudy, i}
				{@const progress = i * (100 / Math.max(1, caseStudies.length - 1))}
				{@const effectiveScroll = Math.max(0, y - 1200)}
				{@const scrollRatio = Math.min(1, effectiveScroll / 800)}
				{@const currentProgress = progress + (50 - progress) * scrollRatio}
				<div class="case-study-item" style="width: fit-content; margin-left: {currentProgress}%; transform: translateX(-{currentProgress}%);">
					<h4>
						<a href={caseStudy.path} class="case-study-link">
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
			<article class="home--post item-boxshadow">
				{#if post.meta.mainImg}
					<div class="home--post-image" style="background-image: url({post.meta.mainImg})"></div>
				{:else}
					<div class="home--post-image"></div>
				{/if}
				<div class="home--post-content">
					<h4>
						<a href={post.path}>{post.meta.title}</a>
					</h4>

					<p><a href={post.path}>Read more</a></p>
				</div>
			</article>
		{/each}
	</div>

	<div class="view-all-container">
		<a href="/blog" class="view-all-articles">View all articles</a>
	</div>
</div>

<style>
	.home--hero {
		margin: 100px 20px 30px 20px;
	}
	@media only screen and (min-device-width: 500px) {
		.home--hero {
			margin: 29px 0 58px 0;
		}
	}
	.home--hero h1 {
		font-size: 70px;
		line-height: 74px;
		margin-bottom: 0;
		display: inline-block;
		border-bottom: 16px solid var(--accentColor);
	}
	.home--hero h2 {
		font-weight: 200;
		font-size: 54px;
		margin: 0;
	}
	.home--hero h3 {
		margin-top: 5px;
	}
	.home--images {
		display: grid;
		grid-template-columns: 10% 30% 50% 10%;
		margin-bottom: 20px;
	}
	.home--images .speaking1,
	.home--images .climbing {
		grid-column-start: 3;
		grid-column-end: 4;
		width: 110%;
		margin-left: -5%;
		margin-top: 10%;
		z-index: 10;
	}
	.home--images .wireframes1,
	.home--images .golfcart {
		grid-column-start: 2;
		grid-column-end: 3;
		width: 100%;
		z-index: 9;
	}
	.home--images .wireframes1 {
		margin-left: 25px;
	}
	.home--images .golfcart {
		margin-top: -2%;
	}
	.home--images .speaking1 {
		margin-top: 10px;
		margin-left: 100px;
	}
	.hipster-spacer {
		min-height: 3px;
		width: 7%;
		background-color: #336699;
	}
	.home--info .hipster-spacer {
		background-color: #fff;
	}
	.home--info {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		background: #336699;
		box-sizing: border-box;
		padding: 10% 10% 8% 10%;
	}
	.home--info h3 {
		margin-top: 0;
	}
	.home--info p {
		text-align: center;
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
		color: #fff;
		background: var(--darkColor);
		box-sizing: border-box;
		padding: 100px 20px 80px 20px;
		overflow: hidden;
	}
	.home--case-studies h3 {
		margin-top: 0;
	}
	.home--case-studies .hipster-spacer {
		background-color: #fff;
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
	.case-study-item a {
		color: #fff;
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
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
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
	.home--post {
		flex: 1 1 300px;
		box-sizing: border-box;
		border-radius: 4px;
		margin: 0 20px 40px 20px;
		border: 1px solid #e5e5e5;
		overflow: hidden;
	}
	.home--post-content {
		margin: 15px;
	}
	.home--post .home--post-image {
		background: url('https://picsum.photos/id/472/400/200');
		width: auto;
		height: 200px;
		background-size: cover;
	}
	.home--post:nth-child(12n + 3) {
		flex: 1 1 100%;
		display: flex;
		height: 240px;
	}
	.home--post:nth-child(12n + 3) .home--post-image {
		width: 100%;
		height: 100%;
	}
	.home--post:nth-child(12n + 3) .home--post-content {
		width: 50%;
	}
	.home--post h4 > a {
		text-decoration: none;
		color: #333;
	}
	.home--post p {
		font-size: 15px;
		font-weight: 400;
		color: #15171a;
	}
	.view-all-container {
		text-align: center;
		margin: 40px 0 60px 0;
	}
	.view-all-articles {
		display: inline-block;
		padding: 12px 24px;
		border: 2px solid var(--accentColor);
		color: var(--textColor);
		text-decoration: none;
		font-weight: bold;
		border-radius: 4px;
		transition: all 0.3s ease;
	}
	.view-all-articles:hover {
		background-color: var(--accentColor);
		color: #fff;
	}
</style>
