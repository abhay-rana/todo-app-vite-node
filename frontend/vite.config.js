import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import removeConsole from 'vite-plugin-remove-console';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

export default defineConfig(() => ({
    plugins: [
        react(),
        svgr({
            // import svg as a component
            exportAsDefault: true,
        }),
        eslint(),
        removeConsole(),
    ],
    server: {
        // open at the port
        port: 3000,
        // open the browser automatically
        open: true,
        // host the url to the outer network like run in mobile
        host: true,
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.jsx?$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: [],
    },
    // this is used for using the .js extension in the vite as it only supports the .jsx extension
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\/.*\.js$/ },
                            async (args) => ({
                                loader: 'jsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },
    // rename the entry point in vite -> set into the index.html
    // path alias in vite
    resolve: {
        alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    },
}));
