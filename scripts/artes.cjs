// Exportar ou substituir uma mídia sem mudar seus índices no motor.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'assets.js');
const source = fs.readFileSync(file, 'utf8');
const prefix = 'const ASSETS14=';
const start = source.indexOf(prefix);
if (start < 0 || !source.trimEnd().endsWith(';')) throw Error('Formato de assets.js inesperado.');
const assets = JSON.parse(source.trimEnd().slice(start + prefix.length, -1));
const ext = b => {
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  if (b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'png';
  if (b[0] === 255 && b[1] === 216) return 'jpg';
  if (b.toString('ascii', 0, 3) === 'ID3' || (b[0] === 255 && (b[1]&224) === 224)) return 'mp3';
  return 'bin';
};
const [cmd, raw, replacement] = process.argv.slice(2);
if (cmd === 'exportar') {
  const out = path.join(root, 'exports', 'artes');
  fs.mkdirSync(out, { recursive: true });
  for (let i = 0; i < assets.length; i++) {
    const data = Buffer.from(assets[i], 'base64');
    fs.writeFileSync(path.join(out, `${String(i).padStart(3, '0')}.${ext(data)}`), data);
  }
  console.log(`${assets.length} mídias exportadas em exports/artes/.`);
} else if (cmd === 'substituir') {
  const index = Number(raw);
  if (!raw || !Number.isInteger(index) || index < 0 || index >= assets.length || !replacement) throw Error('Uso: npm run artes -- substituir 5 caminho-da-imagem.webp');
  const old = Buffer.from(assets[index], 'base64');
  const next = fs.readFileSync(path.resolve(process.cwd(), replacement));
  if (!next.length || ext(next) === 'bin' || ext(next) !== ext(old)) throw Error('Use o mesmo formato do recurso original.');
  const dir = path.join(root, 'backups'); fs.mkdirSync(dir, { recursive: true });
  const backup = path.join(dir, `assets-${Date.now()}.js`); fs.copyFileSync(file, backup);
  assets[index] = next.toString('base64');
  fs.writeFileSync(file, source.slice(0, start) + prefix + JSON.stringify(assets) + ';\n');
  console.log(`Mídia ${index} substituída. Backup: ${path.relative(root, backup)}.`);
} else console.log('npm run artes -- exportar\nnpm run artes -- substituir INDICE ARQUIVO');
