// Entrelinhas: a side story that uses the existing calendar, cast and save system.
const entrelinhasScenes = [
    {
        id: 'photograph', who: 'ezra', loc: 'library', mood: 'neutral',
        title: 'A fotografia sem legenda',
        text: 'Encontrei isto dentro de um anuário. A turma está reunida no festival, mas alguém arrancou a legenda. Não sei se foi por acaso.',
        choices: [
            ['Vamos procurar a legenda antes de tirar conclusões.', 'investigate', 1, 'Então começamos pelo arquivo. Prefiro perguntas a certezas inventadas.'],
            ['Talvez alguém tenha motivos para não aparecer.', 'privacy', 1, 'É verdade. Uma fotografia não dá a ninguém o direito de invadir uma vida.'],
            ['Mostre a foto ao conselho. Eles podem reconhecer alguém.', 'share', 0, 'Vou perguntar sem entregar o original. Ainda não sei em quem confiar.']
        ],
        clue: 'Fotografia do antigo festival sem identificação.'
    },
    {
        id: 'schedule', who: 'soren', loc: 'hall', mood: 'neutral',
        title: 'Uma data riscada',
        text: 'O registro oficial diz que o festival terminou normalmente. Mas esta cópia do cronograma tem uma apresentação cancelada e nenhuma justificativa.',
        choices: [
            ['Compare as duas versões comigo.', 'investigate', 1, 'Podemos conferir o que mudou sem acusar ninguém.'],
            ['Não quero transformar isso em exposição pública.', 'privacy', 1, 'Concordo. As pessoas envolvidas merecem ser ouvidas primeiro.'],
            ['O jornal deveria saber que existe uma divergência.', 'share', 0, 'Desde que fique claro que uma divergência não é prova de culpa.']
        ],
        clue: 'Cronograma com uma apresentação cancelada.'
    },
    {
        id: 'rehearsal', who: 'dante', loc: 'music', mood: 'neutral',
        title: 'A música que ficou',
        text: 'Achei uma partitura antiga. Tem uma frase escrita na margem: depois do sinal. O estranho é que conheço essa melodia. Alguém ainda toca isso.',
        choices: [
            ['Vamos descobrir de onde veio a música.', 'investigate', 1, 'Posso tocar um trecho. Talvez alguém reconheça.'],
            ['Guarde a partitura até sabermos de quem é.', 'privacy', 1, 'Tudo bem. Não quero que vire atração de festival.'],
            ['Convide os outros para ouvir.', 'share', 0, 'Posso fazer isso. Mas sem transformar uma suspeita em boato.']
        ],
        clue: 'Partitura com a mesma frase do bilhete.'
    },
    {
        id: 'archive', who: 'raven', loc: 'library', mood: 'neutral',
        title: 'Aquilo que não dizemos',
        text: 'As três pistas apontam para a mesma apresentação. O arquivo não explica por que ela foi cancelada. Quero investigar, mas não quero repetir os erros de quem apagou essa história.',
        choices: [
            ['Vamos procurar os antigos estudantes e ouvir o que têm a dizer.', 'investigate', 1, 'Uma história contada por quem viveu nela. Faz sentido.'],
            ['Prometo preservar a identidade de quem não quiser falar.', 'privacy', 2, 'Obrigada. Era isso que eu precisava ouvir antes de continuar.'],
            ['Vamos reunir o grupo e decidir juntos.', 'share', 1, 'Certo. Mas precisamos combinar o que não será divulgado.']
        ],
        clue: 'O cancelamento permanece sem explicação. Uma nova investigação começa.'
    }
];

function getEntrelinhas(save) {
    if (!save.entrelinhas || typeof save.entrelinhas !== 'object' || Array.isArray(save.entrelinhas)) {
        save.entrelinhas = {};
    }
    const journal = save.entrelinhas;
    if (!journal.answers || typeof journal.answers !== 'object' || Array.isArray(journal.answers)) journal.answers = {};
    for (const scene of entrelinhasScenes) {
        const answer = journal.answers[scene.id];
        if (!answer || !Number.isInteger(answer.choice) || !scene.choices[answer.choice] || !Number.isInteger(answer.day) || answer.day < 1) {
            delete journal.answers[scene.id];
        }
    }
    return journal;
}

function nextEntrelinhasScene(save, day, phase, knows) {
    if ((save.episode || 1) < 5 || phase !== 'Tarde' || !Number.isInteger(day)) return null;
    const journal = getEntrelinhas(save);
    const index = entrelinhasScenes.findIndex(scene => !journal.answers[scene.id]);
    if (index < 0) return null;
    const scene = entrelinhasScenes[index];
    if (!knows(scene.who)) return null;
    if (index > 0 && day <= journal.answers[entrelinhasScenes[index - 1].id].day) return null;
    return scene;
}

function recordEntrelinhasChoice(save, day, phase, sceneId, choice, knows) {
    const scene = nextEntrelinhasScene(save, day, phase, knows);
    if (!scene || scene.id !== sceneId || !Number.isInteger(choice) || !scene.choices[choice]) return false;
    const [text, approach, trust] = scene.choices[choice];
    getEntrelinhas(save).answers[scene.id] = { choice, day };
    save.trust[scene.who] = (save.trust[scene.who] || 0) + trust;
    save.log.push({ who: scene.who, choice: text, aff: 0, trust, chapter42: save.episode });
    const facts = story42(save).facts;
    (facts[scene.who] ||= {}).entrelinhas = approach;
    return true;
}

function entrelinhasRecall(save, scene) {
    const answers = getEntrelinhas(save).answers;
    const previous = entrelinhasScenes[entrelinhasScenes.indexOf(scene) - 1];
    if (!previous || !answers[previous.id]) return '';
    const approach = previous.choices[answers[previous.id].choice][1];
    return {
        investigate: 'Soube que você preferiu conferir as pistas antes de concluir qualquer coisa.',
        privacy: 'Me disseram que você está tentando preservar as pessoas envolvidas. Isso importa.',
        share: 'Ouvi que você quer envolver outras pessoas. Espero que possamos fazer isso com cuidado.'
    }[approach] || '';
}

function showEntrelinhas(sceneId = null) {
    if (!state) return;
    const journal = getEntrelinhas(state);
    const day = roomData11().day;
    const phase = world12().phase;
    const available = nextEntrelinhasScene(state, day, phase, profileKnown);
    modalType = 'entrelinhas';
    const cards = entrelinhasScenes.map((scene, index) => {
        const answer = journal.answers[scene.id];
        if (!answer) return '<article class="entre-clue"><small>FRAGMENTO ' + (index + 1) + '</small><p>Não descoberto.</p></article>';
        return '<article class="entre-clue"><small>FRAGMENTO ' + (index + 1) + '</small><h3>' + esc(scene.title) + '</h3><p>' + esc(scene.clue) + '</p><small>Dia ' + answer.day + '</small></article>';
    }).join('');
    const completed = entrelinhasScenes.every(scene => journal.answers[scene.id]);
    let content = '<p class="entre-note">Disponível a partir do episódio 05, durante a tarde. Conheça os personagens e avance os dias pela agenda.</p>';
    if (completed) content = '<p class="entre-note">Quatro fragmentos reunidos. A verdade ainda depende das pessoas que viveram aquela história.</p>';
    if (available) {
        const recall = entrelinhasRecall(state, available);
        content = '<div class="stage10 entre-stage"><div class="entre-bg">' + bg(available.loc) + '</div><div class="actor10 speaking10" style="--slot:50%"><div class="actorart10">' + sprite(available.who, available.mood) + '</div><span>' + esc(name90(available.who)) + '</span></div></div>' +
            '<div class="entre-talk"><small>ENTRELINHAS / ' + esc(available.title) + '</small>' +
            (recall ? '<p class="entre-recall">' + esc(recall) + '</p>' : '') +
            '<p>' + esc(available.text) + '</p>' +
            available.choices.map((choice, index) => '<button class="choice" data-act="entreChoice" data-id="' + available.id + '" data-i="' + index + '">' + esc(choice[0]) + '</button>').join('') + '</div>';
    } else if (sceneId && journal.answers[sceneId]) {
        const scene = entrelinhasScenes.find(item => item.id === sceneId);
        if (scene) content = '<div class="entre-talk"><small>' + esc(name90(scene.who)) + '</small><p>' + esc(scene.choices[journal.answers[sceneId].choice][3]) + '</p><p class="entre-recall">Fragmento registrado. Volte em outra tarde para continuar.</p></div>';
    }
    showPanel('Entrelinhas · Arquivo', '<div class="entre-panel"><header class="entre-header"><small>BELLMONT / ECOS DO PASSADO</small><h3>Nem toda lembrança foi preservada.</h3><p>Dia ' + day + ' · ' + esc(phase) + '</p></header>' + content + '<h3>Fragmentos da investigação</h3><div class="entre-grid">' + cards + '</div><button class="soft" data-act="calendar12">Voltar à agenda</button></div>');
    document.querySelector('#modal .panel')?.classList.add('entre-modal');
}

function renderEntrelinhasIdentity(app) {
    if (!app || !state) return;
    app.classList.add('entrelinhas-edition');
    app.dataset.entrePhase = world12().phase;

    const main = app.querySelector('.main');
    const scene = main?.querySelector(':scope > .scene');
    const dialog = main?.querySelector(':scope > .dialog');
    const nav = app.querySelector('.rail12 .nav');
    const group = nav?.querySelector('.bell-nav-group');
    if (group) {
        group.insertAdjacentHTML('beforeend', '<button data-act="entreArchive">◇ Arquivo</button>');
    }
    if (!scene || !dialog || !nav) return;

    app.classList.add('entre-immersive');
    const frame = document.createElement('section');
    frame.className = 'entre-stage-frame';
    scene.before(frame);
    frame.append(scene, dialog);

    const choices = dialog.querySelector('.choices');
    if (choices) {
        frame.classList.add('entre-stage-choices');
        frame.append(choices);
        choices.setAttribute('aria-label', 'Suas escolhas');
    }

    const quick = document.createElement('nav');
    quick.className = 'entre-icon-rail';
    quick.setAttribute('aria-label', 'Acesso rápido');
    const actions = ['home', 'calendar12', 'journal', 'settings12'];
    for (const act of actions) {
        const original = nav.querySelector('[data-act="' + act + '"]');
        if (!original) continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.act = act;
        const [label, path] = bellNav43[act] || ['Arquivo', 'M4 6h16v4H4z M5 10h14v11H5z M9 14h6'];
        button.title = label;
        button.setAttribute('aria-label', label);
        button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + path + '"/></svg>';
        const badge = original.querySelector('em');
        if (badge) button.append(badge.cloneNode(true));
        quick.append(button);
    }
    frame.append(quick);

    const menu = document.createElement('details');
    menu.className = 'entre-full-menu';
    menu.innerHTML = '<summary aria-label="Todas as opções" title="Todas as opções">☰</summary>';
    menu.append(nav);
    frame.append(menu);

    const tools = document.createElement('div');
    tools.className = 'entre-dialog-tools';
    tools.innerHTML = '<button data-act="saves">▣ Salvar</button><button data-act="history12">◷ Histórico de escolhas</button>';
    const controls = document.createElement('div');
    controls.className = 'entre-dialog-controls';
    const next = dialog.querySelector('.nextrow');
    if (next) controls.append(next);
    controls.append(tools);
    dialog.append(controls);
}

document.addEventListener('click', event => {
    const button = event.target.closest('[data-act]');
    if (!button || button.disabled || !state) return;
    if (button.dataset.act === 'entreArchive') showEntrelinhas();
    if (button.dataset.act === 'entreChoice') {
        const day = roomData11().day;
        const sceneId = button.dataset.id;
        if (!recordEntrelinhasChoice(state, day, world12().phase, sceneId, Number(button.dataset.i), profileKnown)) return;
        persist();
        render();
        showEntrelinhas(sceneId);
    }
});
