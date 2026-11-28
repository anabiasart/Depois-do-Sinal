// integracao-estabilidade | v0.14
/* v0.14 — integrate common services once, after all existing feature modules. */
const panelBase14=showPanel;showPanel=function(title,content){return panelBase14(title,compactMedia14(content))};
const coverBase14=cover;cover=function(){let h=coverBase14().replace(/Edição 0\.[0-9.]+[^<]*/,'Edição 0.14 • Edição de estabilidade');return h.replace('<button class="soft" data-act="about">Sobre o jogo</button>','<button class="soft" data-act="about">Sobre o jogo</button><button class="soft" data-act="import14">Importar progresso</button>')};
function renderSaveWarning() {
    const root=document.getElementById('root');
  if(saveWarning14&&root&&!root.querySelector('.savewarn14')){
    const n=document.createElement('div');
    n.className='savewarn14';
    n.textContent=saveWarning14;
    root.append(n)
  }
}

const closeBase14=close;close=function(){finishTyping11();closeBase14()};
const settingsBase14=settings12;settings12=function(){settingsBase14();document.querySelector('#modal .world12')?.insertAdjacentHTML('beforeend',`<h3>Recuperação de progresso</h3><p>${esc(saveWarning14||'Uma cópia do último salvamento válido é mantida no navegador, quando há espaço disponível.')}</p><button class="soft" data-act="backup14">Restaurar cópia anterior</button><p class="hint">Os arquivos JSON continuam compatíveis com as versões anteriores. Exporte antes de mudar de arquivo ou navegador.</p>`)};
// Stop invalid imports and continue from safe, validated data. All gameplay handlers remain unchanged.
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act;if(a==='import14'){e.stopImmediatePropagation();modalType='saves';showPanel('Importar progresso','<p>Escolha seu arquivo JSON exportado de outra versão de Depois do Sinal.</p><label>Salvamento JSON <input type="file" accept=".json,application/json" id="import4"></label>');return}if(a==='backup14'){e.stopImmediatePropagation();try{const s=prepareSave14(JSON.parse(localStorage.getItem(key+':backup14')));if(confirm('Restaurar a cópia anterior?')){commitSave14(s);toast('Cópia recuperada')}}catch{toast('Nenhuma cópia válida disponível.')}return}if(a==='continue'){e.stopImmediatePropagation();try{const s=prepareSave14((!storageOK&&saved)||load()||saved);commitSave14(s);if(recovered14){toast('Progresso recuperado da cópia anterior.');recovered14=false}}catch{toast('Não foi possível abrir o progresso. Importe uma cópia JSON.')}return}},true);
