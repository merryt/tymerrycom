<!-- __layout.svelte -->
<script>
	import Header from '$lib/components/Header.svelte';
	import '$lib/styles/style.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<span>Tyler Merry</span>
	<div>
		<a href="/blog/my-design-process">Process</a>
		<a href="https://github.com/merryt" class="nav-item">Code</a>
		<a href="https://www.behance.net/merryt" class="nav-item">Portfolio</a>
		<a href="https://dribbble.com/tymerry" class="nav-item">Dribbble</a>
		<a href="https://www.linkedin.com/in/merryt" class="nav-item">LinkedIn</a>
	</div>
</footer>

<style>
	footer {
		background-color: rgba(0, 0, 0, 0.25);
		width: calc(100%-20px);
		height: 25px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}
	footer a {
		color: var(--textColor);
	}
</style>
