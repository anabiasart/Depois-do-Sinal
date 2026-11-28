// Experiência de jogo: criação inicial, foco narrativo e atalhos.
let creatorStep = 'appearance';
let storyFocus = true;

const creatorTabs = {
    appearance: 'Aparência',
    outfit: 'Primeiro look'
};

function creatorPalette(key, title) {
    return `<fieldset class="creator-palette"><legend>${title}</legend>
        <div class="creator-swatches">${palettes9[key].map(([id, name, color]) =>
            `<button type="button" data-act="creatorColor" data-key="${key}" data-id="${id}"
                aria-pressed="${draft.look[key] === id}"><i style="background:${color}"></i>${esc(name)}</button>`
        ).join('')}</div></fieldset>`;
}

function creatorOptions() {
    if (creatorStep === 'appearance') return [
        creatorPalette('hair', 'Cabelo'),
        creatorPalette('eyes', 'Olhos'),
        creatorPalette('skin', 'Tom de pele')
    ].join('');
    return `<div class="creator-looks">${Object.entries(signatureNames83).map(([id, name]) =>
        `<button type="button" data-act="creatorOutfit" data-id="${id}" aria-pressed="${draft.look.outfit === id}">
            ${catalogThumb92(id)}<b>${esc(name)}</b></button>`
    ).join('')}</div>`;
}

function creatorPreview() {
    return compactMedia14(signatureArt83(draft.look, 'neutral'));
}

function drawCreator() {
    draft.look = look9({...draft.look, visualMode9: 'signature'});
    closet9(draft);
    showPanel('Sua história começa aqui', `
        <div class="creator">
            <div class="creator-preview">
                <span class="creator-kicker">BELLMONT / NOVA ESTUDANTE</span>
                <div class="creator-art">${creatorPreview()}</div>
                <b class="creator-lookname">${esc(signatureNames83[draft.look.outfit] || '')}</b>
            </div>
            <div class="creator-form">
                <span class="creator-kicker">PERSONALIZE SUA PROTAGONISTA</span>
                <h3>Quem é você?</h3>
                <label for="name">Seu nome</label>
                <input id="name" maxlength="24" value="${esc(draft.name)}" autocomplete="off">
                <div class="creator-tabs">${Object.entries(creatorTabs).map(([id, label]) =>
                    `<button type="button" data-act="creatorTab" data-id="${id}" aria-pressed="${creatorStep === id}">${label}</button>`
                ).join('')}</div>
                <div class="creator-options">${creatorOptions()}</div>
                <p class="hint">Você poderá mudar seu visual e acessar todos os recursos do ateliê durante a história.</p>
                ${saved ? '<p class="creator-warning">Uma nova partida substituirá o progresso ativo. Exporte ou guarde uma cópia antes de começar.</p>' : ''}
                <div class="creator-actions">
                    <button class="soft" data-act="creatorReset">Restaurar visual</button>
                    <button class="primary" data-act="creatorStart">Começar a história ›</button>
                </div>
            </div>
        </div>`);
    document.querySelector('#modal .panel')?.classList.add('creator-panel');
}

const fullAtelier = drawWard7;
drawWard7 = function () {
    if (modalType === 'new') return drawCreator();
    return fullAtelier();
};

const openBeforeCreator = modal;
modal = function (type) {
    if (type === 'new') creatorStep = 'appearance';
    return openBeforeCreator(type);
};

function refreshCreator() {
    const panel = document.querySelector('.creator-panel');
    if (!panel) return;
    panel.querySelector('.creator-art').innerHTML = creatorPreview();
    panel.querySelector('.creator-lookname').textContent = signatureNames83[draft.look.outfit] || '';
    panel.querySelector('.creator-options').innerHTML = creatorOptions();
    panel.querySelectorAll('[data-act="creatorTab"]').forEach(b =>
        b.setAttribute('aria-pressed', String(b.dataset.id === creatorStep)));
}

// Reaproveita a navegação narrativa e os botões existentes, sem duplicar o motor.
function renderStoryFocus() {
    const app = document.querySelector('.shell12');
    if (!app || screen !== 'game') return;
    app.classList.toggle('story-focus', storyFocus);
    const ep = app.querySelector('.episode');
    if (ep) ep.insertAdjacentHTML('beforeend', `<button class="story-toggle" data-act="storyFocus"
        aria-pressed="${storyFocus}">${storyFocus ? 'Ver vínculos' : 'Focar na história'}</button>`);
    const next = app.querySelector('.dialog [data-act="next"]');
    if (next) next.textContent = 'Continuar ›';
}

document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b || b.disabled) return;
    const {act, id, key} = b.dataset;
    if (act === 'next' && !modalType && typing11 && b.closest('.main .dialog')) {
        e.stopImmediatePropagation();
        finishTyping11();
        return;
    }
    if (act === 'storyFocus') {
        storyFocus = !storyFocus;
        const app = document.querySelector('.shell12');
        app?.classList.toggle('story-focus', storyFocus);
        b.textContent = storyFocus ? 'Ver vínculos' : 'Focar na história';
        b.setAttribute('aria-pressed', String(storyFocus));
        return;
    }
    if (modalType !== 'new' || !draft || !act.startsWith('creator')) return;
    e.stopImmediatePropagation();
    keepName8();
    if (act === 'creatorTab' && creatorTabs[id]) creatorStep = id;
    if (act === 'creatorColor' && palettes9[key]?.some(x => x[0] === id)) draft.look[key] = id;
    if (act === 'creatorOutfit' && presets9[id]) {
        draft.look.outfit = id;
        draft.look.fashion = {...draft.look.fashion, ...presets9[id]};
    }
    if (act === 'creatorReset') draft.look = look9(initial().look);
    if (act === 'creatorStart') {
        if (saved && !confirm('Começar uma nova história e substituir o progresso ativo?')) return;
        // O fluxo original de início continua responsável por normalizar e salvar.
        const start = document.createElement('button');
        start.hidden = true;
        start.dataset.act = 'start';
        document.querySelector('.creator-actions').append(start);
        start.click();
        start.remove();
        return;
    }
    refreshCreator();
}, true);

const closeBeforeExperience = close;
close = function () {
    const opener = modalOpener;
    modalOpener = null;
    closeBeforeExperience();
    if (opener?.isConnected) opener.focus({preventScroll: true});
};

document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.repeat || e.altKey || e.ctrlKey || e.metaKey ||
        modalType || screen !== 'game' || !state || ![' ', 'Enter'].includes(e.key)) return;
    if (e.target.closest?.('button,input,textarea,select,a,summary,[contenteditable]')) return;
    const next = document.querySelector('.main .dialog [data-act="next"]');
    if (!next || next.disabled) return;
    e.preventDefault();
    if (typing11) finishTyping11();
    else next.click();
});
