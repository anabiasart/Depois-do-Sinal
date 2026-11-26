// Build local, sem dependências. A ordem mantém a semântica dos scripts clássicos.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const ordem = JSON.parse(read('src/ordem.json'));
function reunir(lista) {
  return lista.map((p) => read(p).trimEnd()).join('\n\n') + '\n';
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
