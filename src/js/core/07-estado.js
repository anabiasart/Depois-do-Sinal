let state = null;
let screen = 'cover';
let draft = null;
let modalType = null;

const initial = () => ({
    name: 'Alex',
    look: {
        hair: 'castanho',
        eyes: 'mel',
        skin: 'clara',
        outfit: 'uniforme'
    },
    aff: Object.fromEntries(routes.map(id => [id, 0])),
    trust: Object.fromEntries(routes.map(id => [id, 0])),
    visited: [],
    items: [],
    messages: [],
    gallery: [],
    log: [],
    flags: {},
    node: 'intro0',
    loc: 'bedroom',
    ending: null,
    sceneChoice: null
});

function load() {
    return loadSave14();
}

let saved = load();
let storageOK = true;

// Feed updates may save without re-running story and social synchronization.
function persistMemoryStage() {
    if (!state) return;
    syncMemory12();
    writeSave14(state);
}

function persist() {
    if (!state) return;
    syncStory42();
    syncSocial13();
    persistMemoryStage();
}

function toast(message) {
    const notification = document.createElement('div');
    notification.className = 'toast';
    notification.textContent = message;
    document.body.append(notification);
    setTimeout(() => notification.remove(), 2500);
}
