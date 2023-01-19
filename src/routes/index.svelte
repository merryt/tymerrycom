<script context="module">
	export const load = async ({ fetch }) => {
		const posts = await fetch('api/blog.json');
		const allPosts = await posts.json();
		return {
			props: {
				posts: allPosts
			}
		};
	};
</script>

<script>
	import windowScrollPosition from '$lib/windowScrollPosition.js';
	export let posts;
	let y;
</script>

<svelte:window bind:scrollY={y} />

<div class="home">
	<div class="home--hero">
		<h1>HEY!</h1>
		<h2 class="skinny">
			My name is Tyler,<br />
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
		<div class="hipster-spacer" />
		<p>
			I like to help people, the way I normally do that is through building easy to use websites
			that help people solve a problem. I also like to help people fix their bikes and maintain
			hiking trails.
		</p>
		<p>
			Previously I spoke at conferences, and run meetups in Denver. Now I try to help more one on
			one!
		</p>
	</div>

	<div class="home--post-container">
		{#each posts.slice(0, 5) as post}
			<article class="home--post">
				{#if post.meta.mainImg}
					<div class="home--post-image" style="background-image: url({post.meta.mainImg})" />
				{:else}
					<div class="home--post-image" />
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
</div>

<style>
	.home--hero {
		margin: 100px 20px 30px 20px;
	}
	@media only screen and (min-device-width: 500px) {
		.home--hero {
			margin: 58px 0;
		}
	}
	.home--hero h1 {
		font-size: 70px;
		line-height: 74px;
		margin-bottom: 0;
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
	.home--post-container {
		width: 90%;
		margin: -30px auto 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.home--post {
		flex: 1 1 300px;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 1px 3px 8px rgba(39, 44, 49, 0.03);
		margin: 0 20px 40px 20px;
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
</style>
