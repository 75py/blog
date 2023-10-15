import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';


// https://astro.build/config
export default defineConfig({
	site: 'https://www.nagopy.com/',
	integrations: [
		mdx(),
		sitemap({
			filter(page) {
				const pageUrl = new URL(page);
				return !pageUrl.pathname.match(/^\/blog\/tags\/.+/);
			}
		}),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		})
	],
	trailingSlash: 'ignore',
	vite: {
		optimizeDeps: {
			exclude: ['@resvg/resvg-js']
		}
	},
});
