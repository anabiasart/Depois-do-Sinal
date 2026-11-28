// Adapter between the legacy game and the social rules.
function handleSocialChoice(choice) {
    if (!state) return;
    const social = getSocialState(state);
    const changed = resolveSocialEvent(
        social, roomData11().day, world12().phase, choice, profileKnown
    );
    if (!changed) return;
    persist();
    showLivingBellmont();
}

document.addEventListener('click', event => {
    const button = event.target.closest('[data-act]');
    if (!button || button.disabled || !state) return;
    switch (button.dataset.act) {
        case 'living16':
            showLivingBellmont();
            break;
        case 'livingChoice16':
            handleSocialChoice(Number(button.dataset.i));
            break;
    }
});
