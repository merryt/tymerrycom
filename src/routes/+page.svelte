<script>
	import { onMount } from 'svelte';
	import windowScrollPosition from '$lib/windowScrollPosition.js';
	import PostCard from '$lib/components/PostCard.svelte';
	import Button from '$lib/components/Button.svelte';
	export let data;
	let { posts, caseStudies } = data;
	let y;

	function glitchEffect(node) {
		const ctx = node.getContext('2d');
		let width, height;
		let animationId;
		let mouse = { x: 0, y: 0, active: false };
		let glitchIntensity = 0;
		let lastX = 0,
			lastY = 0;

		const img = new Image();
		img.src = '/two_tone_profile.jpg';

		function resize() {
			width = node.clientWidth;
			height = node.clientHeight;
			node.width = width * window.devicePixelRatio;
			node.height = height * window.devicePixelRatio;
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		}

		let currentZoom = 1.0;
		let currentFocus = { x: 0.5, y: 0.5 };

		function animate() {
			if (!img.complete) {
				animationId = requestAnimationFrame(animate);
				return;
			}

			ctx.clearRect(0, 0, width, height);

			// 1. Calculate Zoom and Focus based on mouse position
			let targetZoom = 1.0;
			let targetFocus = { x: 0.5, y: 0.5 };

			if (mouse.active) {
				const centerX = width / 2;
				const centerY = height / 2;
				const dx = mouse.x - centerX;
				const dy = mouse.y - centerY;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

				// Keep the proximity zoom logic
				targetZoom = 1.0 + (1 - Math.min(1, dist / maxDist)) * 0.2;

				// Move focus towards the cursor
				targetFocus.x = mouse.x / width;
				targetFocus.y = mouse.y / height;
			}

			// Smooth transitions
			currentZoom += (targetZoom - currentZoom) * 0.1;
			currentFocus.x += (targetFocus.x - currentFocus.x) * 0.1;
			currentFocus.y += (targetFocus.y - currentFocus.y) * 0.1;

			// 2. Logic for "cover" behavior + Zoom Focus
			const imgRatio = img.width / img.height;
			const targetRatio = width / height;
			let sx, sy, sw, sh;

			if (imgRatio > targetRatio) {
				sh = img.height;
				sw = sh * targetRatio;
				sx = (img.width - sw) / 2;
				sy = 0;
			} else {
				sw = img.width;
				sh = sw / targetRatio;
				sx = 0;
				sy = (img.height - sh) / 2;
			}

			// Apply zoom and focus to source coordinates
			const swZ = sw / currentZoom;
			const shZ = sh / currentZoom;

			// Focus determines how the remaining space is distributed
			const sxZ = sx + (sw - swZ) * currentFocus.x;
			const syZ = sy + (sh - shZ) * currentFocus.y;

			const drawBase = (ox = 0, oy = 0) => {
				ctx.drawImage(img, sxZ, syZ, swZ, shZ, ox, oy, width, height);
			};

			// Base image
			ctx.globalAlpha = 1.0;
			drawBase();

			// Only glitch if the mouse is moving (intensity > threshold)
			if (mouse.active && glitchIntensity > 0.05) {
				const intensity = Math.min(1.0, glitchIntensity);

				// 1. RGB Split
				if (Math.random() < 0.6 * intensity) {
					ctx.save();
					ctx.globalCompositeOperation = 'screen';
					const offset = 15 * intensity;
					ctx.globalAlpha = 0.5 * intensity;
					drawBase((Math.random() - 0.5) * offset, (Math.random() - 0.5) * offset);
					ctx.restore();
				}

				// 2. Horizontal Slices
				const numSlices = Math.floor(20 * intensity);
				for (let i = 0; i < numSlices; i++) {
					if (Math.random() < 0.5 * intensity) {
						const sliceY = Math.random() * height;
						const sliceH = Math.random() * (50 * intensity) + 2;
						const sliceX = (Math.random() - 0.5) * (80 * intensity);

						// Calculate source slice coords using zoomed values
						const sSliceY = syZ + (sliceY / height) * shZ;
						const sSliceH = (sliceH / height) * shZ;

						ctx.drawImage(img, sxZ, sSliceY, swZ, sSliceH, sliceX, sliceY, width, sliceH);
					}
				}

				// 3. Noise Blocks
				if (Math.random() < 0.3 * intensity) {
					ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
					ctx.fillRect(
						Math.random() * width,
						Math.random() * height,
						Math.random() * 200 * intensity,
						Math.random() * 40 * intensity
					);
				}

				// Quickly decay intensity so it stops when mouse stops
				glitchIntensity *= 0.9;
			} else {
				glitchIntensity = 0;
			}

			animationId = requestAnimationFrame(animate);
		}

		function onMouseMove(e) {
			const rect = node.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const dx = x - lastX;
			const dy = y - lastY;
			const dist = Math.sqrt(dx * dx + dy * dy);

			// Set glitch intensity based on movement speed
			glitchIntensity = Math.max(glitchIntensity, dist / 40);

			lastX = x;
			lastY = y;
			mouse.x = x;
			mouse.y = y;
		}

		window.addEventListener('resize', resize);
		node.addEventListener('mousemove', onMouseMove);
		node.addEventListener('mouseenter', () => (mouse.active = true));
		node.addEventListener('mouseleave', () => (mouse.active = false));

		resize();
		animate();

		return {
			destroy() {
				window.removeEventListener('resize', resize);
				cancelAnimationFrame(animationId);
			}
		};
	}
</script>

<svelte:window bind:scrollY={y} />

<div class="home">
	<div class="home--hero">
		<h4 class="home--hero-sub-header playfair-display-regular">
			<span>Design</span><span class="home--hero-sub-header-divider">•</span><span>Development</span
			><span class="home--hero-sub-header-divider">•</span><span>Product</span>
		</h4>
		<h2>Technology based<br />problem solver</h2>
		<h3>I am not special but you make me feel that way, thanks for checking me out!</h3>
	</div>
	<!-- todo remove this block and delete these images form the repo -->
	<!-- <div class="home--images">
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
	</div> -->

	<div class="home--info">
		<div>
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
	.home--hero h1 {
		font-size: 70px;
		line-height: 74px;
		margin-bottom: 0;
		display: inline-block;
		border-bottom: 16px solid var(--accentColor);
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
	}
	/*
	 .home--info p {
		text-align: center;
	} */
	.home--info-photo {
		flex: 1;
		cursor: crosshair;
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
		color: var(--white);
	}
</style>
