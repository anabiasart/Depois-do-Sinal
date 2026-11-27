// Controle central de janelas. O conteúdo continua compatível com os sistemas antigos.
let modalOpener = null;

function showPanel(title, content) {
    const root = document.getElementById('modal');
    const previous = root.querySelector('.panel');
    const page = [modalType, title, modalType === 'phone' ? app90 + ':' + chat90 : ''].join('|');
    const same = previous?.dataset.page === page;
    const scroll = same ? previous.scrollTop : 0;
    const contentScroll = same ? previous.querySelector('.bpcontent')?.scrollTop || 0 : 0;
    const oldNav = modalType === 'phone' ? previous?.querySelector('.bpnav') : null;
    const navScroll = oldNav?.scrollLeft || 0;
    const navTop = oldNav?.scrollTop || 0;
    if (!previous) modalOpener = document.activeElement;

    root.innerHTML = `<div class="overlay"><section class="panel" role="dialog"
        aria-modal="true" aria-labelledby="modalTitle" tabindex="-1">
        <header class="panelhead">
            <button type="button" class="modal-back" aria-label="Voltar">‹ <span>Voltar</span></button>
            <h2 id="modalTitle">${esc(title)}</h2>
            <button type="button" class="close" data-act="close" aria-label="Fechar janela">Fechar <span aria-hidden="true">×</span></button>
        </header>${content}</section></div>`;

    const panel = root.querySelector('.panel');
    panel.dataset.page = page;
    panel.dataset.kind = modalType || '';
    panel.querySelector('.modal-back').onclick = () => backModal(title);
    if (!same) panel.focus({preventScroll: true});
    if (same || oldNav) requestAnimationFrame(() => {
        if (!panel.isConnected) return;
        if (same) {
            panel.scrollTop = scroll;
            const content = panel.querySelector('.bpcontent');
            if (content) content.scrollTop = contentScroll;
        }
        const nav = panel.querySelector('.bpnav');
        if (nav) {
            nav.scrollLeft = navScroll;
            nav.scrollTop = navTop;
        }
    });
}

function backModal(title) {
    if (modalType === 'profile') return modal('cast');
    if (modalType === 'phone') {
        if (app90 === 'feed' && storyOpen13) {
            storyOpen13 = null;
            return phone7();
        }
        if (app90 === 'messages' && chat90 !== null) {
            chat90 = null;
            return phone7();
        }
        if (app90 !== 'home') {
            app90 = 'home';
            return phone7();
        }
    }
    if (modalType === 'cg10') return title === 'Galeria · Momentos da cidade' ? cityPanel10() : gallery10();
    if (modalType === 'city10' && title !== 'Cidade de Bellmont') return cityPanel10();
    if (modalType === 'room11' && ['Decoração do quarto', 'Caixa de lembranças'].includes(title)) return roomPanel11();
    close();
}

// Foco de teclado: impede que Tab navegue para trás da janela.
document.addEventListener('keydown', e => {
    const panel = document.querySelector('#modal .panel');
    if (!panel || e.key !== 'Tab') return;
    const items = [...panel.querySelectorAll('button:not([disabled]), input:not([disabled]), select, textarea, a[href], summary, [tabindex="0"]')]
        .filter(el => el.getClientRects().length && !el.closest('[hidden]'));
    if (!items.length) { e.preventDefault(); panel.focus(); return; }
    const first = items[0], last = items.at(-1), active = document.activeElement;
    if (!panel.contains(active) || active === panel || (e.shiftKey ? active === first : active === last)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
    }
});
