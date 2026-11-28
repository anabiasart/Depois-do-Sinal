// Build local, sem dependências. A ordem mantém a semântica dos scripts clássicos.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const ordem = JSON.parse(read('src/ordem.json'));
// Temporary bridge: social modules also run inside the classic offline bundle.
function readSource(file) {
    const source = read(file);
    if (!file.endsWith('.mjs')) return source;
    if (!['src/js/mundo/social/events.mjs', 'src/js/mundo/social/social-state.mjs'].includes(file)) {
        throw new Error('Unsupported classic module: ' + file);
    }
    return source
        .replace(/^import \{ socialEvents \} from ['"]\.\/events\.mjs['"];?\r?\n\r?\n/, '')
        .replace(/^export (?=(?:const|function) )/gm, '');
}
function reunir(lista) {
    return lista.map(file => readSource(file).trimEnd()).join('\n\n') + '\n';
}
const js = '// GERADO: edite src/js e execute npm run build.\n' + reunir(ordem.javascript);
const css = '/* GERADO: edite src/css e execute npm run build. */\n' + reunir(ordem.css);
new vm.Script(js, { filename: 'game.js' });
for (const [nome, texto] of [['game.js', js], ['style.css', css]]) {
  const destino = path.join(root, nome);
  const temporario = destino + '.tmp';
  fs.writeFileSync(temporario, texto, 'utf8');
  fs.renameSync(temporario, destino);
}
console.log(`Build concluído: ${ordem.javascript.length} arquivos JS e ${ordem.css.length} CSS.`);
