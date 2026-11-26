
const fs = require('node:fs');

const read = p =>
    fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

const pending = new Map();

const edit = (p, fn) =>
    pending.set(p, fn(pending.get(p) ?? read(p)));

const escape = s =>
    s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Remove estilos antigos e conflitantes.
const css = (file, selectors, props = []) => {
    edit('src/css/' + file + '.css', s => {
        for (const selector of selectors) {
            s = s.replace(
                new RegExp(
                    '^[ \\t]*' + escape(selector) +
                    '\\s*\\{[^{}]*\\}', 'gm'
                ),
                ''
            );
        }

        for (const prop of props) {
            s = s.replace(
                new RegExp(
                    '^[ \\t]*' + escape(prop) + ';?',
                    'gm'
                ),
                ''
            );
        }

        return s;
    });
};

css('01-base-e-protagonista', [
    '.overlay', '.panel', '.panelhead', '.close'
]);

css('04-bellmont-life', [
    '.wide7', '.overlay', '.panel'
]);

css('06-moda', ['.fashionpanel9']);

css('07-signature-e-bellphone', ['.bppanel'], [
    'min-height:460px',
    'max-height:65vh',
    'min-height:370px',
    'max-height:63vh',
    'max-height:165px'
]);

edit('src/css/07-signature-e-bellphone.css', s =>
    s.replace(
        /(\.bpcontent\s*\{[^{}]*?)overflow:auto;?/g,
        '$1'
    )
);

css('08-polimento', [
    '.fashionpanel9 .panelhead',
    '.panel',
    '.overlay'
]);

css('09-conversas', ['.group94 .history94'], [
    'height:min(58vh,610px)',
    'min-height:360px',
    'min-height:100px',
    'max-height:55%',
    'height:480px',
    'min-height:350px'
]);

edit('src/css/09-conversas.css', s =>
    s.replace(
        /^[ \t]*\.thread94\s*\{\s*\}/gm,
        ''
    )
);

css('11-cidade', ['.citypanel10']);
css('12-quarto', ['.roomPanel11']);

css('13-interface-calendario', [
    '.overlay',
    '.panel',
    '.worldPanel12'
]);

// Direciona as modais antigas ao novo controlador.
edit('src/js/core/10-controles-base.js', s => {
    const start = s.indexOf('function modal(type)');
    const end = s.indexOf('\nfunction close()', start);

    if (start < 0 || end < 0) {
        throw Error('Função modal original não localizada');
    }

    const part = s.slice(start, end);

    const marker =
        "document.getElementById('modal').innerHTML=";

    const pos = part.lastIndexOf(marker);

    if (pos < 0) {
        if (part.includes('showPanel(title,content);')) {
            return s;
        }

        throw Error('Estrutura inesperada em modal()');
    }

    return s.slice(0, start) +
        part.slice(0, pos) +
        'showPanel(title,content);}' +
        s.slice(end);
});

// Remove o controlador duplicado.
edit('src/js/historia/12-episodio-02.js', s => {
    const start = s.indexOf('function showPanel(');

    if (start < 0) return s;

    const end = s.indexOf('showProfile=function', start);

    if (end < 0) {
        throw Error('Não localizei showProfile');
    }

    return s.slice(0, start) + s.slice(end);
});

// Limpa espaçamentos e separadores excessivos.
edit('src/js/core/35-interface-mundo-e-slots.js', s =>
    s.split('\n')
        .filter(l =>
            l.trim() && !/^\s*\/\/ =+\s*$/.test(l)
        )
        .join('\n') + '\n'
);

// Atualiza a ordem de carregamento.
edit('src/ordem.json', s => {
    const o = JSON.parse(s);

    const js = 'src/js/core/40-modais.js';
    const css = 'src/css/16-modais.css';

    o.javascript = o.javascript.filter(p => p !== js);

    const i = o.javascript.indexOf(
        'src/js/historia/12-episodio-02.js'
    );

    if (i < 0) throw Error('Ordem inesperada');

    o.javascript.splice(i, 0, js);

    o.css = o.css.filter(p => p !== css);
    o.css.push(css);

    return JSON.stringify(o, null, 2) + '\n';
});

// Verifica se os novos arquivos existem.
for (const p of [
    'src/js/core/40-modais.js',
    'src/css/16-modais.css',
    'src/css/15-estabilidade.css'
]) {
    if (!fs.existsSync(p)) {
        throw Error('Crie primeiro ' + p);
    }
}

// Aplica as alterações.
for (const [p, s] of pending) {
    fs.writeFileSync(p, s);
}

console.log('Arquivos atualizados.');
console.log('Execute npm run build e npm run check.');
