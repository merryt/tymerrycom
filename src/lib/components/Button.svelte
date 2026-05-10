<script>
	export let href = '';
	export let variant = 'outline'; // 'primary', 'outline', 'text'
	export let className = '';
</script>

<a {href} class="btn btn--{variant} {className}">
	<slot />
</a>

<style>
	.btn {
		display: inline-block;
		padding: 12px 24px;
		text-decoration: none;
		font-weight: bold;
		border-radius: 4px;
		transition: all 0.3s ease;
		cursor: pointer;
		font-size: 1rem;
		text-align: center;
	}

	.btn--primary {
		background-color: var(--accentColor);
		color: var(--white);
		border: 2px solid var(--accentColor);
	}

	.btn--primary:hover {
		background-color: transparent;
		color: var(--accentColor);
	}

	.btn--outline {
		border: 2px solid var(--accentColor);
		color: var(--textColor);
		background-color: transparent;
	}

	.btn--outline:hover {
		background-color: var(--accentColor);
		color: var(--white);
	}

	.btn--text {
		color: var(--accentColor);
		padding: 8px 16px;
	}

	.btn--text:hover {
		text-decoration: underline;
	}
</style>
