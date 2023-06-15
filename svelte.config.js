import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: 'src/routes/_posts.svelte',
				work: 'src/routes/_posts.svelte',
				chess: 'src/routes/_posts.svelte',
				temp: 'src/routes/_posts.svelte',
			}
		})
	]
};

export default config;
