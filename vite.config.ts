/*
 * @Author: qiye
 * @LastEditors: qiye
 * @description: page description
 * @Date: 2023-01-09 13:53:38
 * @LastEditTime: 2023-01-09 13:55:26
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default async ({ mode, command }) => {
	return defineConfig({
		plugins: [
			vue(),
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],
		resolve: {
			// 配置路径别名
			alias: {
				'@': '/src',
			},
		},
	});
};
