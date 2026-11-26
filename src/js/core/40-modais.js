
// Controle central de janelas e navegação.

function showPanel(title, content) {
    const root = document.getElementById('modal');
    const previous = root.querySelector('.panel');

    const page = [
        modalType,
        title,
        modalType === 'phone'
            ? app90 + ':' + chat90 : ''
    ].join('|');

    const samePage = previous?.dataset.page === page;
    const scroll = samePage ? previous.scrollTop : 0;
    const navScroll = samePage
        ? previous.querySelector('.bpnav')?.scrollLeft || 0
        : 0;

    root.innerHTML = `
        <div class="overlay">
            <section class="panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modalTitle"
                tabindex="-1">

                <header class="panelhead">
                    <h2 id="modalTitle">${esc(title)}</h2>

                    <div class="modal-controls">
                        <button type="button" class="modal-back">
                            ‹ Voltar
                        </button>

                        <button type="button"
                            class="close"
                            data-act="close"
                            aria-label="Fechar janela"
                            title="Fechar janela">
                            ×
                        </button>
                    </div>
                </header>

                ${content}
            </section>
        </div>`;

    const panel = root.querySelector('.panel');
    panel.dataset.page = page;

    panel.querySelector('.modal-back').onclick =
        () => backModal(title);

    if (!previous) {
        panel.focus({ preventScroll: true });
    }

    if (samePage) requestAnimationFrame(() => {
        if (!panel.isConnected) return;

        panel.scrollTop = scroll;

        const nav = panel.querySelector('.bpnav');
        if (nav) nav.scrollLeft = navScroll;
    });
}

// Navegação de retorno
function backModal(title) {

    if (modalType === 'profile') {
        return modal('cast');
    }

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

    if (modalType === 'cg10') {
        if (title !== 'Galeria · Momentos da cidade') {
            return gallery10();
        }

        return cityPanel10();
    }

    if (
        modalType === 'city10' &&
        title !== 'Cidade de Bellmont'
    ) {
        return cityPanel10();
    }

    if (
        modalType === 'room11' &&
        ['Decoração do quarto', 'Caixa de lembranças']
            .includes(title)
    ) {
        return roomPanel11();
    }

    close();
}
