import { defineConfig } from "@farmfe/core";

import vue from "@vitejs/plugin-vue";

export default defineConfig({
	compilation: {
		resolve: {
			alias: {
				"@": `${__dirname}/src`,
			},
		},
	},
	vitePlugins: [vue()],
});
