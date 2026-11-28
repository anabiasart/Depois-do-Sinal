function renderSocialScene(event, day, social) {
    const choice = social.resolved[String(day)];
    const previous = social.resolved[String(day - socialEvents.length)];
    const actors = event.pair.map((id, index) => {
        const [expression, label] = getSocialMood(id, day, social, people12);
        const slot = index === 0 ? '29%' : '72%';
        return `
            <div class="actor10 ${index === 0 ? 'speaking10' : ''}" style="--slot:${slot}">
                <div class="actorart10">${sprite(id, expression)}</div>
                <span>${esc(name90(id))} · ${esc(label)}</span>
            </div>`;
    }).join('');

    return `
        <div class="stage10 climate12">
            <div style="position:absolute;inset:0;overflow:hidden">${bg(event.loc)}</div>
            ${actors}
        </div>
        <div class="sceneTalk10">
            ${Number.isInteger(previous) && event.outcomes[previous]
                ? `<p><small>Último encontro: ${esc(event.outcomes[previous])}</small></p>`
                : ''}
            ${event.lines.map((line, index) =>
                `<p><b>${esc(name90(event.pair[index]))}:</b> ${esc(line)}</p>`).join('')}
            ${hasResolvedSocialEvent(social, day) && event.outcomes[choice]
                ? `<p><b>Desfecho:</b> ${esc(event.outcomes[choice])}</p>`
                : ''}
        </div>`;
}

function renderDailySocialEvent(event, day, social) {
    if (!event || !event.pair.every(profileKnown)) {
        return '<p>Conheça mais personagens e volte durante a tarde para descobrir acontecimentos.</p>';
    }
    const choices = hasResolvedSocialEvent(social, day)
        ? '<p>Você já acompanhou este acontecimento.</p>'
        : event.choices.map((text, index) =>
            `<button class="choice" data-act="livingChoice16" data-i="${index}">${esc(text)}</button>`).join('');
    return `
        <article class="memory12">
            <h3>${esc(event.title)}</h3>
            <p>${esc(event.text)}</p>
            ${renderSocialScene(event, day, social)}
            ${choices}
        </article>`;
}

function renderSchoolReputation(social) {
    return schoolReputationTraits.map(trait => `
        <article class="memory12">
            <b>${esc(trait)}</b>
            <p>${social.reputation[trait]} pontos</p>
        </article>`).join('');
}

function renderSocialBonds(day, social) {
    return socialEvents.filter(event => event.pair.every(profileKnown)).map(event => {
        const bond = getSocialBond(day, event.pair, social);
        const label = bond >= 5 ? 'Parceria fortalecida' : bond < 0 ? 'Relação tensa' : 'Convivência';
        return `<article class="memory12">
            <b>${event.pair.map(name90).map(esc).join(' e ')}</b>
            <p>Proximidade: ${bond} · ${label}</p>
        </article>`;
    }).join('') || '<p>Os vínculos aparecem conforme você conhece o elenco.</p>';
}

function showLivingBellmont() {
    if (!state) return;
    modalType = 'living16';
    const social = getSocialState(state);
    const day = roomData11().day;
    const phase = world12().phase;
    const event = getDailySocialEvent(day, phase);
    showPanel('Vida em Bellmont', `
        <div class="world12">
            <div class="worldhero12">
                <small>LIVING BELLMONT / EXPERIMENTAL</small>
                <h3>O mundo não espera por você.</h3>
                <p>Dia ${day} · ${esc(phase)}</p>
            </div>
            <h3>Reputação escolar</h3>
            <div class="memoryGrid12">${renderSchoolReputation(social)}</div>
            <h3>Acontecimento de hoje</h3>
            ${renderDailySocialEvent(event, day, social)}
            <h3>Vínculos entre personagens</h3>
            ${renderSocialBonds(day, social)}
            <button class="soft" data-act="calendar12">Voltar à agenda</button>
        </div>`);
    document.querySelector('#modal .panel')?.classList.add('worldPanel12');
}
