import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The classic game remains available until its systems have been migrated.
// Copy its scripts unchanged: they share a global scope and execution order.
export default defineConfig({
    base: './',
    publicDir: false,
    plugins: [
        {
            name: 'bellmont-classic-scripts',
            apply: 'build',
            generateBundle() {
                for (const fileName of ['assets.js', 'game.js']) {
                    this.emitFile({
                        type: 'asset',
                        fileName,
                        source: readFileSync(fileURLToPath(new URL(fileName, import.meta.url)))
                    });
                }
            }
        }
    ]
});
