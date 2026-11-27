// Identidade visual de Bellmont: capa e navegação, sem alterar a história.
function bellmontCrest43() {
    return '<svg class="bell-crest" viewBox="0 0 70 80" aria-hidden="true"><path d="M35 4 59 13 56 47Q51 62 35 72 19 62 14 47L11 13Z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M35 9 54 16 51 45Q47 58 35 66 23 58 19 45L16 16Z" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M8 36Q1 58 22 69M62 36Q69 58 48 69" fill="none" stroke="currentColor"/><text x="35" y="47" text-anchor="middle" fill="currentColor" font-family="Georgia,serif" font-size="36">B</text></svg>';
}

function bellmontTitle43() {
    return '<span>Depois do</span><i>Sinal</i>';
}

// A capa não precisa de um SVG intermediário para retratos rasterizados.
function coverPortrait43(id, mood) {
    const entry = expressionArt[id]?.[mood] || expressionArt[id]?.neutral || animeArt[id];
    if (!entry) return sprite(id,mood);
    const [data,w,h] = entry;
    return `<img class="bell-portrait" src="${mediaURL14(data,'image/webp')}"
        width="${w}" height="${h}" style="--portrait-w:${w}px;--portrait-h:${h}px"
        alt="" decoding="async">`;
}

cover = function () {
    const cast = ['dante','soren','theo','ezra','valentim'];
    const moods = ['neutral','neutral','smile','shy','smile'];
    return `<section class="bell-cover">
        <div class="bell-cover-visual" aria-hidden="true">
            <div class="bell-cover-bg">${bg('gate')}</div>
            <div class="bell-cast">${cast.map((id,i)=>`<div class="bell-hero bell-hero-${id}">${coverPortrait43(id,moods[i])}</div>`).join('')}</div>
        </div>
        <div class="bell-cover-copy">
            <div class="bell-cover-brand">${bellmontCrest43()}<span>COLÉGIO BELLMONT</span></div>
            <h1 class="bell-title">${bellmontTitle43()}</h1>
            <div class="bell-ornament" aria-hidden="true">✦</div>
            <p class="bell-cover-line">Algumas histórias começam<br>quando a aula termina.</p>
            <nav class="bell-cover-actions" aria-label="Menu inicial">
                <button class="primary" data-act="new">Novo jogo ♡</button>
                <button class="soft" data-act="continue" ${saved?'':'disabled'}>Continuar</button>
                <button class="soft" data-act="cast">Conheça o elenco</button>
                <button class="soft" data-act="about">Sobre o jogo</button>
                <button class="soft" data-act="import14">Importar progresso</button>
            </nav>
            <small class="bell-version">TEMPORADA 01 · EDIÇÃO 0.14</small>
        </div>
    </section>`;
};

const bellNav43 = {
    calendar12:['Agenda','M3 5h18v16H3z M7 3v4 M17 3v4 M3 10h18'],
    phone:['BellPhone','M7 3h10v18H7z M11 17h2'],
    journal:['Diário','M12 5v15 M12 5Q7 2 3 5v14q5-3 9 1 4-4 9-1V5q-4-3-9 0'],
    city10:['Cidade','M3 21V9l5-5 5 5v12 M13 21V6l4-3 4 3v15 M6 13h3 M16 10h2 M16 14h2'],
    wardrobe:['Ateliê','M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h5a3 3 0 0 0 3-3c0-4-4-7-9-7 M7 8h.1 M11 6h.1 M16 7h.1 M6 12h.1'],
    gallery:['Galeria','M3 4h18v16H3z M3 16l5-5 4 4 3-3 6 6 M16 8h.1'],
    cast:['Elenco','M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M3 20v-3a6 6 0 0 1 12 0v3 M16 5a3 3 0 0 1 0 6 M17 14q4 0 4 4v2'],
    stats:['Meu perfil','M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M4 21v-2a8 8 0 0 1 16 0v2'],
    settings12:['Configurações','M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6'],
    room11:['Meu quarto','M3 12l9-8 9 8 M5 10v11h14V10 M10 21v-6h4v6'],
    memory12:['Memórias','M12 21 3.5 12.5a5 5 0 0 1 8.5-5 5 5 0 0 1 8.5 5Z'],
    gifts5:['Presentes','M3 8h18v4H3z M5 12v9h14v-9 M12 8v13 M12 8C3 8 4 1 8 4l4 4c9 0 8-7 4-4z'],
    sound:['Som','M3 9h4l5-4v14l-5-4H3z M15 9q4 3 0 6 M18 6q7 6 0 12'],
    saves:['Progresso','M4 3h14l2 2v16H4z M8 3v6h8V3 M8 21v-8h8v8'],
    home:['Menu inicial','M9 4H4v16h5 M13 8l4 4-4 4 M8 12h13']
};

const bellGroups43 = [
    ['Vida em Bellmont',['calendar12','phone','journal','city10','wardrobe']],
    ['Coleção',['gallery','cast','stats','settings12']],
    ['Mais opções',['room11','memory12','gifts5','sound','saves','home']]
];
let bellMore43 = false;

function arrangeBellNav43(app) {
    const rail = app.querySelector('.rail12');
    const nav = rail?.querySelector('.nav');
    if (!nav) return;
    const buttons = [...nav.querySelectorAll('button[data-act]')];
    const byId = new Map(buttons.map(b=>[b.dataset.act,b]));
    rail.querySelector('.railLabel12')?.remove();
    rail.insertAdjacentHTML('afterbegin',`<div class="bell-rail-brand">${bellmontCrest43()}<small>COLÉGIO BELLMONT</small><div class="bell-title">${bellmontTitle43()}</div><div class="bell-ornament" aria-hidden="true">✦</div></div>`);
    nav.setAttribute('aria-label','Navegação do jogo');
    nav.replaceChildren();
    for (const [name,ids] of bellGroups43) {
        const more = name === 'Mais opções';
        const group = document.createElement(more?'details':'div');
        group.className = more?'bell-nav-more':'bell-nav-group';
        if (more) {
            group.open = bellMore43;
            group.innerHTML = '<summary>Mais opções <span aria-hidden="true">⌄</span></summary>';
            group.addEventListener('toggle',()=>{if(group.isConnected)bellMore43=group.open;});
        } else group.setAttribute('aria-label',name);
        for (const id of ids) {
            const b = byId.get(id);
            if (!b) continue;
            const badge = b.querySelector('em');
            const [label,path] = bellNav43[id];
            b.innerHTML = `<svg class="bell-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg><span>${label}</span>`;
            if (badge) b.append(badge);
            group.append(b);
            byId.delete(id);
        }
        if (more) byId.forEach(b=>group.append(b));
        nav.append(group);
    }
}

const renderBefore43 = render;
render = function () {
    renderBefore43();
    const app = document.querySelector('.shell12');
    if (!app || screen !== 'game') return;
    app.classList.add('bell-editorial');
    arrangeBellNav43(app);
    const heading = app.querySelector('.main > .map h2');
    if (heading?.textContent === 'Onde você vai?') heading.textContent = 'Onde você quer ir?';
};
