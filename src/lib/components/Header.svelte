<script>
	import { onMount } from 'svelte';

	let theme = 'dark';

	onMount(() => {
		theme = document.documentElement.getAttribute('data-theme') || 'dark';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
	const boxChars = [
		'░',
		'▒',
		'▓',
		'█',
		'▄',
		'▀',
		'■',
		'│',
		'┤',
		'╡',
		'╢',
		'╖',
		'╕',
		'╣',
		'║',
		'╗',
		'╝',
		'╜',
		'╛',
		'┐',
		'└',
		'┴',
		'┬',
		'├',
		'─',
		'┼',
		'╞',
		'╟',
		'╚',
		'╔',
		'╩',
		'╦',
		'╠',
		'═',
		'╬',
		'╧',
		'╨',
		'╤',
		'╥',
		'╙',
		'╘',
		'╒',
		'╓',
		'╫',
		'╪',
		'┘',
		'┌'
	];

	function scrambleAction(node) {
		const textSpan = node.querySelector('.scramble-text');
		if (!textSpan) return;

		const originalText = textSpan.innerText;
		let isAnimating = false;
		let interval;

		function handleMouseEnter() {
			if (isAnimating) return;
			isAnimating = true;

			const length = originalText.length;
			let iterations = Array.from({ length }, () => Math.floor(Math.random() * 7) + 3);
			let currentText = originalText.split('');

			interval = setInterval(() => {
				let allDone = true;
				for (let i = 0; i < length; i++) {
					if (originalText[i] === ' ') continue;

					if (iterations[i] > 0) {
						currentText[i] = boxChars[Math.floor(Math.random() * boxChars.length)];
						iterations[i]--;
						allDone = false;
					} else {
						currentText[i] = originalText[i];
					}
				}
				textSpan.innerText = currentText.join('');

				if (allDone) {
					clearInterval(interval);
					isAnimating = false;
				}
			}, 65);
		}

		node.addEventListener('mouseenter', handleMouseEnter);

		return {
			destroy() {
				node.removeEventListener('mouseenter', handleMouseEnter);
				clearInterval(interval);
			}
		};
	}
</script>

<header>
	<a href="/" class="logo"><span class="first-name">Tyler</span> <span>Merry</span></a>
	<nav>
		<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
			{#if theme === 'dark'}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-6"
					><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line
						x1="12"
						y1="21"
						x2="12"
						y2="23"
					></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line
						x1="18.36"
						y1="18.36"
						x2="19.78"
						y2="19.78"
					></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"
					></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line
						x1="18.36"
						y1="5.64"
						x2="19.78"
						y2="4.22"
					></line></svg
				>
			{:else}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg
				>
			{/if}
		</button>
		<a href="/work" use:scrambleAction><span class="scramble-text">Case Studies</span></a>
		<a href="https://github.com/merryt" use:scrambleAction>
			<span class="scramble-text">Code</span>
			<svg class="size-4" fill="currentColor" viewBox="0 0 24 24"
				><path
					d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
				></path></svg
			>
		</a>
		<a href="/about" use:scrambleAction><span class="scramble-text">About</span></a>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		width: var(--desktop-container-width);
		max-width: var(--container-max-width);
		box-sizing: border-box;
		margin: 24px auto 0 auto;
		align-items: stretch;
		border: 1px solid var(--accentColorFour);
		text-transform: uppercase;
		padding: 0;
	}
	@media (max-width: 999px) {
		header {
			padding: 0;
		}
	}
	.logo {
		display: flex;
		align-items: center;
		padding: 0 2rem;
		font-size: 32px;
		line-height: 32px;
		font-weight: 900;
		border-right: 1px solid var(--accentColorFour);
		color: var(--white);
		font-family: 'Playfair Display', serif;
		text-decoration: none;
	}

	.first-name {
		margin-right: 8px;
	}
	@media (max-width: 600px) {
		header {
			width: 100%;
			max-width: 100%;
			margin: 0;
		}
		.logo {
			font-size: 20px;
		}
		.first-name {
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
		display: flex;
		align-items: center;
		gap: 12px;
		font-family: 'Playfair Display', serif;
		text-decoration: none;
		color: var(--accentColorTwo);
		padding: 10px 18px;
		font-weight: 400;
		font-size: 24px;
		transition: all 0.25s ease-in-out;
		border-left: 1px solid var(--accentColorFour);
	}
	nav > a svg {
		width: 24px;
		height: 24px;
	}

	nav > a:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 999px) {
		.logo,
		nav > a {
			font-size: 18px;
		}
	}

	@media (max-width: 600px) {
		nav > a {
			justify-content: space-between;
			padding: 4px 6px;
			font-size: 16px;
		}
	}

	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		padding: 10px 18px;
		color: var(--accentColor);
		transition: all 0.25s ease-in-out;
		border-left: 1px solid var(--accentColorFour);
	}

	.theme-toggle:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.theme-toggle svg {
		width: 24px;
		height: 24px;
	}

	@media (max-width: 600px) {
		.theme-toggle {
			padding: 4px 10px;
		}
	}
</style>
