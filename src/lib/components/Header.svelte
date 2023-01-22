<!-- Header.svelte -->
<header>
	<span class="logo">TM</span>
	<nav>
		<a href="/">Home</a>
		<a href="/blog">Blog</a>
		<a href="/work">Work</a>
		<a href="/uses">Uses</a>
		<a href="/about">About</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		width: var(--container-width);
		margin: 24px auto 0 auto;
		align-items: center;
	}

	.logo {
		font-size: 24px;
		line-height: 24px;
		font-weight: 900;
	}

	nav {
		display: flex;
		justify-content: flex-end;
	}
	nav > a {
		text-decoration: none;
		color: var(--darkColor);
		margin-left: 2px;
		padding: 10px 18px;
		font-weight: 800;
		font-size: 18px;
		border-bottom: 6px solid var(--accentColor);
		transition: all 0.25s ease-in-out;
	}

	nav > a:hover {
		border-bottom-width: 16px;
		padding-bottom: 0;
	}
</style>
