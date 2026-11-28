const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../../src/js/historia/entrelinhas.js'), 'utf8');
const rules = new Function('document', 'story42', source + '\nreturn { getEntrelinhas, nextEntrelinhasScene, recordEntrelinhasChoice, entrelinhasRecall };')(
    { addEventListener() {} }, save => (save.story42 ||= { facts: {} })
);
test('investigation is chapter-gated, time-gated and records each clue once', () => {
    const save = { episode: 4, trust: {}, log: [] };
    const knows = () => true;
    assert.equal(rules.nextEntrelinhasScene(save, 1, 'Tarde', knows), null);
    save.episode = 5;
    assert.equal(rules.nextEntrelinhasScene(save, 1, 'Noite', knows), null);
    assert.equal(rules.nextEntrelinhasScene(save, 1, 'Tarde', () => false), null);
    assert.equal(rules.recordEntrelinhasChoice(save, 1, 'Tarde', 'photograph', 1, knows), true);
    assert.equal(rules.recordEntrelinhasChoice(save, 1, 'Tarde', 'photograph', 1, knows), false);
    assert.equal(save.trust.ezra, 1);
    assert.equal(save.log.length, 1);
    assert.equal(rules.nextEntrelinhasScene(save, 1, 'Tarde', knows), null);
    const next = rules.nextEntrelinhasScene(save, 2, 'Tarde', knows);
    assert.equal(next.id, 'schedule');
    assert.match(rules.entrelinhasRecall(save, next), /preservar/);
    assert.equal(rules.recordEntrelinhasChoice(save, 2, 'Tarde', 'schedule', 0, knows), true);
    assert.equal(rules.recordEntrelinhasChoice(save, 3, 'Tarde', 'rehearsal', 2, knows), true);
    assert.equal(rules.recordEntrelinhasChoice(save, 4, 'Tarde', 'archive', 1, knows), true);
    assert.equal(rules.nextEntrelinhasScene(save, 5, 'Tarde', knows), null);
    assert.equal(Object.keys(rules.getEntrelinhas(JSON.parse(JSON.stringify(save))).answers).length, 4);
});
