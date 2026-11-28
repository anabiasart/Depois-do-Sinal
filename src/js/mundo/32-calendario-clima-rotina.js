const people12 = ['dante', 'soren', 'theo', 'ezra', 'valentim', 'raven'];
const phases12 = ['Manhã', 'Tarde', 'Noite'];
const epoch12 = Date.UTC(2026, 2, 20);
const dayMs12 = 86400000;

const schedule12 = {
    dante: ['Colégio · sala de aula', 'records', 'Ensaio em casa'],
    soren: ['Conselho estudantil', 'books', 'Estudando em casa'],
    theo: ['Colégio · quadra', 'park', 'Treino e descanso'],
    ezra: ['Biblioteca', 'art', 'Editando fotografias'],
    valentim: ['Colégio · auditório', 'Ensaio teatral', 'theatre'],
    raven: ['Jornal escolar', 'cafe', 'Escrevendo em casa']
};

const away12 = {
    dante: ['Clube de música', 'Ensaio fechado', 'Descanso'],
    soren: ['Reunião do conselho', 'Compromisso familiar', 'Estudando em casa'],
    theo: ['Treino', 'Treino do time', 'Descanso'],
    ezra: ['Arquivo de fotografia', 'Projeto fotográfico', 'Editando fotografias'],
    valentim: ['Ensaio', 'Compromisso de teatro', 'Ensaio fechado'],
    raven: ['Redação', 'Entrevista externa', 'Escrevendo em casa']
};

const weekdays12 = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const datesFmt12 = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
});

function world12(save = state) {
    let world = save.world12;
    if (!world || typeof world !== 'object' || Array.isArray(world)) {
        world = save.world12 = {};
    }

    const room = roomData11(save);
    if (!phases12.includes(world.phase)) {
        if (cityData10(save).time === 'Noite') world.phase = 'Noite';
        else world.phase = room.time === 'morning' ? 'Manhã' : 'Tarde';
    }

    if (!world.mem || typeof world.mem !== 'object') world.mem = {};
    for (const key of ['routineDone', 'weatherDone', 'sentDays']) {
        if (!Array.isArray(world[key])) world[key] = [];
    }
    if (typeof world.low !== 'boolean') world.low = false;

    return world;
}

function normalizeCalendar(save) {
    world12(save);
}

function date12(day = roomData11().day) {
    return new Date(epoch12 + (day - 1) * dayMs12);
}

function season12(day = roomData11().day) {
    const month = date12(day).getUTCMonth();
    if (month >= 2 && month <= 4) return 'Primavera';
    if (month >= 5 && month <= 7) return 'Verão';
    if (month >= 8 && month <= 10) return 'Outono';
    return 'Inverno';
}

function weather12(day = roomData11().day) {
    const season = season12(day);
    const pattern = (day * 17 + Math.floor(day / 7) * 11) % 10;

    switch (season) {
        case 'Inverno':
            if (pattern < 4) return 'Neve';
            return pattern < 7 ? 'Nublado' : 'Céu limpo';
        case 'Outono':
            if (pattern < 4) return 'Chuva';
            return pattern < 8 ? 'Nublado' : 'Céu limpo';
        case 'Verão':
            if (pattern < 2) return 'Chuva';
            return pattern < 4 ? 'Nublado' : 'Céu limpo';
        default:
            if (pattern < 4) return 'Chuva';
            return pattern < 6 ? 'Nublado' : 'Céu limpo';
    }
}

function when12(id, day = roomData11().day, phase = world12().phase) {
    const phaseIndex = phases12.indexOf(phase);
    const characterIndex = people12.indexOf(id);
    const hasOtherPlans = (day + characterIndex * 2) % 7 === 0;
    const schedule = hasOtherPlans ? away12[id] : schedule12[id];
    return schedule[phaseIndex];
}

function place12(location) {
    return city10[location]?.name || location;
}

function status12(day = roomData11().day) {
    const date = date12(day);
    const weekday = weekdays12[date.getUTCDay()];
    return `${weekday}, ${datesFmt12.format(date)} · ${season12(day)} · ${weather12(day)}`;
}

function setPhase12(phase) {
    if (!phases12.includes(phase)) return;
    world12().phase = phase;
    cityData10().time = phase === 'Noite' ? 'Noite' : 'Tarde';
    roomData11().time = phase === 'Noite' ? 'night' : 'morning';
    persist();
}

function nextDay12() {
    roomData11().day++;
    setPhase12('Manhã');
    render();
    toast('Novo dia em Bellmont.');
}

roomRest11 = function () {
    if (world12().phase === 'Noite') {
        nextDay12();
    } else {
        setPhase12('Noite');
    }
    roomPanel11();
};

const oldDate12 = canDate10;
canDate10 = function (id) {
    const location = city10[id];
    return !!(
        location?.who &&
        world12().phase === location.time &&
        when12(location.who) === id &&
        oldDate12(id)
    );
};

const oldGroup12 = canGroup10;
canGroup10 = function (id) {
    const location = city10[groups10[id]?.loc];
    return world12().phase === location?.time && oldGroup12(id);
};
