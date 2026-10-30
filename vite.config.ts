import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter(),
			// Behind Caddy, adapter-node would derive an http:// origin from the
			// proxied request and reject every contact-form POST as cross-site.
			paths: { origin: 'https://antoinedespres.com' }
		}),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			emitTsDeclarations: true,
			strategy: ['url', 'cookie', 'baseLocale']
		})
	]
};

export default config;
