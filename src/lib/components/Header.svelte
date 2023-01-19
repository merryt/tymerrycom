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
	}

	.logo {
		font-size: 24px;
		font-weight: 900;
	}

	nav {
		display: flex;
		justify-content: flex-end;
	}
	nav > a {
		text-decoration: none;
		color: #f8f8f8;
		margin-left: 2px;
		padding: 10px 18px;
		font-size: 18px;
		border-radius: 8px;
		transition: background-color 0.25s ease-in-out;
	}

	nav > a:hover {
		background-color: rgba(0, 0, 0, 0.25);
	}
</style>
