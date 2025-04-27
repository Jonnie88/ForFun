import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html' // <-- Viktigt för GitHub Pages
		}),
		paths: {
			base: '/ForFun'
		}
	}
};

export default config;
