<!-- Header.svelte -->
<header>
	<span class="logo">TM</span>
	<nav>
		<a href="/">Home</a>
		<a href="/blog">Blog</a>
		<a href="/work">Work</a>
		<a href="/uses">Uses</a>
		<a href="https://github.com/merryt">Code</a>
		<a href="/about">About</a>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		max-width: var(--desktop-container-width);
		margin: 24px auto 0 auto;
		align-items: center;
	}
	@media (max-width: 999px) {
		header {
			padding: 0 10px;
		}
	}

	.logo {
		font-size: 24px;
		line-height: 24px;
		font-weight: 900;
	}
	@media (max-width: 600px) {
		header {
			width: 100%;
		}
		.logo {
			display: none;
		}
	}

	nav {
		display: flex;
		justify-content: flex-end;
	}
	@media (max-width: 600px) {
		nav {
			justify-content: space-between;
			width: 95%;
		}
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

	@media (max-width: 600px) {
		nav > a {
			justify-content: space-between;
			padding: 4px;
		}
	}
</style>
