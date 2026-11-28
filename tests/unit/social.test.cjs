const test = require('node:test');
const assert = require('node:assert/strict');

const loadRules = () => import('../../src/js/mundo/social/social-state.mjs');

test('social state supports existing saves', async () => {
    const { getSocialState } = await loadRules();
    const save = { name: 'Alex' };
    const social = getSocialState(save);
    assert.equal(social.reputation['cooperação'], 0);
    assert.equal(save.living16, social);
});

test('social events repeat every four afternoons', async () => {
    const { getDailySocialEvent } = await loadRules();
    assert.equal(getDailySocialEvent(1, 'Tarde').id, 'rehearsal');
    assert.equal(getDailySocialEvent(5, 'Tarde').id, 'rehearsal');
    assert.equal(getDailySocialEvent(1, 'Noite'), null);
});

test('social choices cannot be repeated and preserve reputation', async () => {
    const { getSocialState, resolveSocialEvent } = await loadRules();
    const social = getSocialState({});
    assert.equal(resolveSocialEvent(social, 1, 'Tarde', 0, () => false), false);
    assert.equal(resolveSocialEvent(social, 1, 'Tarde', 0, () => true), true);
    assert.equal(resolveSocialEvent(social, 1, 'Tarde', 0, () => true), false);
    assert.equal(social.bonds['dante:soren'], 2);
    assert.equal(social.reputation['cooperação'], 1);
});
