<script>
</script>

<footer>
	<span>Tyler Merry</span>
	<div>
		<a href="https://github.com/merryt" class="nav-item">Code</a>
		<a href="https://www.behance.net/merryt" class="nav-item">Portfolio</a>
		<a href="https://dribbble.com/tymerry" class="nav-item">Dribbble</a>
		<a href="https://www.linkedin.com/in/merryt" class="nav-item">LinkedIn</a>
		<a href="/uses">Uses</a>
		<a href="/blog">Blog</a>
	</div>
</footer>

<style>
	footer {
		background-color: var(--darkColor);
		width: 100%;
		height: auto;
		min-height: 25px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--backgroundColor);
		padding: 1rem;
		box-sizing: border-box;
		flex-wrap: wrap;
		gap: 1rem;
	}
	@media (max-width: 600px) {
		footer {
			flex-direction: column;
			text-align: center;
		}
	}
	footer a {
		color: var(--backgroundColor);
		text-decoration: none;
		margin-left: 10px;
	}
	footer a:hover {
		text-decoration: underline;
	}
</style>
