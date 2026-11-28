import { socialEvents } from './events.mjs';

// Social rules do not depend on the DOM or browser storage.
export const schoolReputationTraits = ['cooperação', 'criatividade', 'autonomia'];

function isSocialRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function getSocialState(save) {
    // Keep the original save key so older progress is not lost.
    if (!isSocialRecord(save.living16)) save.living16 = {};
    const social = save.living16;
    for (const key of ['bonds', 'reputation', 'resolved']) {
        if (!isSocialRecord(social[key])) social[key] = {};
    }
    for (const trait of schoolReputationTraits) {
        if (!Number.isFinite(social.reputation[trait])) social.reputation[trait] = 0;
    }
    return social;
}

export function getDailySocialEvent(day, phase) {
    if (!Number.isSafeInteger(day) || day < 1 || phase !== 'Tarde') return null;
    return socialEvents[(day - 1) % socialEvents.length];
}

function socialPairKey(pair) {
    return [...pair].sort().join(':');
}

function limitSocialBond(value) {
    return Math.max(-20, Math.min(20, value));
}

export function getSocialBond(day, pair, social) {
    const key = socialPairKey(pair);
    let baseline = 0;
    for (let offset = 0; offset < 7; offset++) {
        if ((Math.max(1, day) - 1 + offset) % 5 === 0) baseline++;
    }
    const adjustment = social.bonds[key];
    return limitSocialBond(baseline + (Number.isFinite(adjustment) ? adjustment : 0));
}

export function getSocialMood(id, day, social, cast) {
    const influence = socialEvents
        .filter(event => event.pair.includes(id))
        .reduce((sum, event) => sum + getSocialBond(day, event.pair, social), 0);
    const moods = [
        ['neutral', 'Concentrado'],
        ['smile', 'Animado'],
        ['annoyed', 'Impaciente'],
        ['sad', 'Preocupado']
    ];
    const index = day + cast.indexOf(id) + Math.round(influence / 3);
    return moods[((index % moods.length) + moods.length) % moods.length];
}

export function hasResolvedSocialEvent(social, day) {
    return Object.prototype.hasOwnProperty.call(social.resolved, String(day));
}

export function resolveSocialEvent(social, day, phase, choice, knowsCharacter) {
    const event = getDailySocialEvent(day, phase);
    if (!event || ![0, 1, 2].includes(choice)) return false;
    if (!event.pair.every(knowsCharacter) || hasResolvedSocialEvent(social, day)) return false;
    social.resolved[String(day)] = choice;
    if (choice === 2) return true;

    const trait = choice === 0 ? event.trait : 'autonomia';
    social.reputation[trait] = Math.min(100, social.reputation[trait] + 1);
    const key = socialPairKey(event.pair);
    const previous = Number.isFinite(social.bonds[key]) ? social.bonds[key] : 0;
    social.bonds[key] = limitSocialBond(previous + (choice === 0 ? 2 : -1));
    return true;
}
