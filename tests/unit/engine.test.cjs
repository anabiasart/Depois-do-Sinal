// Exercita o motor real (game.js) sem navegador nem mídia. Cada caso possui estado isolado.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const game = read('game.js');
const source = game.replace(/\/\/ executar \| v0\.14\s+render\(\);\s*$/, '');
assert.notEqual(source,game,'Ponto de entrada inesperado: atualize o harness');
const harness = "const ASSETS14 = Array(383).fill('');\nconst memory = new Map();\nlet blocked = false;\nconst localStorage = {\n    getItem: k => memory.get(k) ?? null,\n    setItem(k,v) { if (blocked) throw Error('quota'); memory.set(k,String(v)); },\n    removeItem: k => memory.delete(k)\n};\nconst document = { addEventListener() {}, getElementById() { return null; }, querySelector() { return null; } };\nconst window = {};\n";
const fixture = JSON.parse(read('tests/fixtures/legacy-minimal.json'));
const fixture2 = JSON.parse(read('tests/fixtures/chapter-02.json'));
const scenarios = [
  [
    "save legado: migração preserva dados e não altera a entrada",
    "const s=prepareSave14(fixture);\nassert.equal(s.episode,1); assert.equal(s.name,fixture.name); assert.equal(s.aff.dante,7);\nassert.equal(s.trust.dante,8); assert.equal(s.messages[0].chapter42,1);\nassert.equal(s.story42.memories.dante[0].text,'Gostei da música.');\nassert.ok(s.world12 && s.bellphone90 && s.fashion9);\nassert.equal(fixture.episode,undefined); assert.equal(fixture.messages[0].chapter42,undefined);"
  ],
  [
    "save inválido: rejeita JSON quebrado e tipos incorretos",
    "assert.equal(parseSave14('{'),null);\nassert.equal(parseSave14('null'),null);\nassert.throws(()=>prepareSave14({...fixture,episode:99}));\nassert.throws(()=>prepareSave14({...fixture,messages:[{who:'dante',text:12}]}));\nassert.throws(()=>prepareSave14({...fixture,look:[]}));\nassert.throws(()=>prepareSave14({...fixture,log:{}}));"
  ],
  [
    "round-trip: conserva memórias, afinidade e mensagens",
    "const s=prepareSave14(fixture2);\nconst copy=prepareSave14(JSON.parse(JSON.stringify(s)));\nassert.equal(copy.story42.facts.dante.preference,'rock');\nassert.equal(copy.messages.length,2); assert.equal(copy.replied[0].text,'Obrigada.');\nassert.equal(copy.trust.dante,8); assert.equal(copy.episode,2);\nassert.ok(copy.story42.memories.dante.some(x=>x.kind==='reply'&&x.text==='Obrigada.'));"
  ],
  [
    "backup: recupera o último save válido e evita escrita redundante",
    "const s=prepareSave14(fixture);\nassert.equal(writeSave14(s),true); assert.equal(writeCount14,1);\nassert.equal(writeSave14(s),true); assert.equal(skippedWrites14,1);\ns.name='Novo nome'; assert.equal(writeSave14(s),true);\nassert.equal(JSON.parse(memory.get(key+':backup14')).name,fixture.name);\nmemory.set(key,'{'); const recovered=loadSave14();\nassert.equal(recovered.name,fixture.name); assert.equal(recovered14,true);"
  ],
  [
    "armazenamento indisponível: falha controlada",
    "const s=prepareSave14(fixture); blocked=true;\nassert.equal(writeSave14(s),false); assert.equal(storageOK,false); assert.ok(saveWarning14.length);\nassert.equal(saved.name,s.name);"
  ],
  [
    "narrativa: escolha registra memória apenas uma vez e avança o capítulo",
    "state=prepareSave14(initial()); render=()=>{}; toast=()=>{};\nstate.node='enc3'; state.loc='music';\nfor(let i=0;i<3;i++)next();\nassert.equal(extraScene42().row.choices.length,3);\nnext(); assert.equal(extraScene42().row.choices.length,3);\nchoose(0); assert.equal(story42().facts.dante.preference,'rock');\nassert.equal(state.trust.dante,1); choose(0); assert.equal(state.trust.dante,1);\nnext(); next(); assert.ok(state.visited.includes('music'));\nassert.equal(state.messages.length,1); assert.equal(state.messages[0].chapter42,1);\nstate.node='ending'; startEpisode2();\nassert.equal(state.episode,2); assert.equal(state.node,'e2intro');\nassert.equal(unread90(),0); assert.equal(story42().facts.dante.preference,'rock');"
  ],
  [
    "BellPhone: arquivo por capítulo preserva índices e favoritos",
    "state=prepareSave14(fixture2); data90().stars.push(0);\nassert.equal(unread90(),1); assert.equal(unread90('dante'),0);\nassert.equal(unread90('soren'),1); assert.equal(liveMessage42(state.messages[0]),false);\nassert.equal(liveMessage42(state.messages[1]),true);\nassert.equal(state.messages.length,2); assert.equal(state.replied[0].text,'Obrigada.');\nfilter90='archive'; const html=chats90(); assert.ok(html.includes('Uma mensagem anterior.'));\nassert.ok(html.includes('Obrigada.')); assert.ok(!html.includes('Uma mensagem nova.'));"
  ]
];
for (const [name, body] of scenarios) {
    test(name, () => {
        const run = new Function('assert','fixture','fixture2', harness+'\n'+source+'\n'+body);
        run(assert, structuredClone(fixture), structuredClone(fixture2));
    });
}
test('manifesto sem arquivos repetidos ou ausentes', () => {
    const order = JSON.parse(read('src/ordem.json'));
    for (const [kind,ext] of [['javascript','.js'],['css','.css']]) {
        const files = order[kind];
        assert.equal(new Set(files).size,files.length);
        for (const file of files) {
            assert.ok(file.startsWith('src/') && file.endsWith(ext));
            assert.ok(fs.statSync(path.join(root,file)).isFile(),file);
        }
    }
    assert.equal(order.javascript.at(-1),'src/js/core/39-executar.js');
});
