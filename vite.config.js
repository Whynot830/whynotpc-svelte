import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import path from 'node:path'
export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
});
