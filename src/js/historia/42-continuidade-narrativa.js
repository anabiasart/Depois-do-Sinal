// Continuidade narrativa: cenas, fatos lembrados e caixa de entrada por capítulo.
function story42(s = state) {
    const d = s.story42;
    if (!d || typeof d !== 'object' || Array.isArray(d)) s.story42 = {};
    const x = s.story42;
    for (const k of ['scenes', 'facts', 'memories']) {
        if (!x[k] || typeof x[k] !== 'object' || Array.isArray(x[k])) x[k] = {};
    }
    return x;
}

function syncStory42(s = state) {
    if (!s) return;
    const d = story42(s), chapter = s.episode || 1;
    // Nunca removemos mensagens do vetor: respostas e favoritos usam seus índices.
    for (const m of s.messages || []) {
        if (!Number.isInteger(m.chapter42)) m.chapter42 = chapter;
    }
    for (const log of s.log || []) {
        if (!Number.isInteger(log.chapter42)) log.chapter42 = chapter;
    }
    const memories = {};
    function add(who, event) {
        if (!who || typeof event.text !== 'string') return;
        (memories[who] ||= []).push(event);
    }
    for (const log of s.log || []) add(log.who, {
        kind: 'choice', chapter: log.chapter42, text: log.choice
    });
    for (const [i, r] of Object.entries(s.replied || {})) {
        const m = s.messages[i];
        if (m && r && typeof r.text === 'string') add(m.who, {
            kind: 'reply', chapter: m.chapter42, text: r.text,
            context: m.text, answer: r.answer
        });
    }
    for (const id of Object.keys(memories)) memories[id] = memories[id].slice(-12);
    d.memories = memories;
}

const normalizeBefore42 = normalize;
normalize = function (s) {
    const result = normalizeBefore42(s);
    syncStory42(s);
    return result;
};

// Fatos específicos: cada escolha tem uma resposta própria e um retorno futuro.
const characterFacts42 = {
    dante: {
        question: 'O que você ouve quando ninguém está por perto?',
        options: [
            ['Rock. Gosto de guitarras sem muita cerimônia.', 'Então escuta o refrão, não a gravação inteira. Ainda estou mexendo nela.', 'rock'],
            ['Música tranquila. Gosto de prestar atenção na letra.', 'É. A letra é a parte que eu mais demoro para terminar.', 'letra'],
            ['Prefiro ficar em silêncio às vezes.', 'Boa. Nem todo intervalo precisa de uma trilha sonora.', 'silêncio']
        ],
        intro: [
            ['dante', 'Antes de sair, um favor. Se alguém do conselho perguntar, não estava tocando acima do volume permitido.'],
            ['me', 'Não tenho nem um dia de aula e já estou sendo recrutada para guardar segredos.'],
            ['dante', 'Não é um segredo. É uma diferença de opinião entre mim e o regulamento.']
        ],
        recall: {
            rock: 'Deixei a guitarra um pouco mais alta no ensaio. Lembrei que você gosta de rock. Se for demais, me avisa.',
            letra: 'Reescrevi a segunda estrofe. Você disse que presta atenção nas letras; queria sua opinião quando estiver pronta.',
            silêncio: 'Hoje reservei dez minutos sem amplificador. Você tinha razão: silêncio também faz parte da música.'
        },
        later: 'Não preciso ganhar uma discussão com o conselho. Só quero que a música exista sem alguém decidindo por mim o que ela significa.'
    },
    soren: {
        question: 'Quando você chega a um lugar novo, prefere ter um plano ou descobrir tudo aos poucos?',
        options: [
            ['Prefiro ter um plano. Assim fico mais tranquila.', 'Então marquei os lugares essenciais no mapa. Não precisa decorar tudo hoje.', 'plano'],
            ['Gosto de descobrir as coisas aos poucos.', 'Nesse caso, deixei alguns espaços em branco. Talvez seja melhor que eu não estrague a descoberta.', 'descoberta'],
            ['Depende do dia. Nem tudo precisa ser controlado.', 'Uma observação razoável. Vou tentar lembrar quando o cronograma desandar.', 'flexibilidade']
        ],
        intro: [
            ['soren', 'Espere. A secretaria esqueceu de incluir uma informação importante. A sala do conselho fica aberta durante o intervalo.'],
            ['me', 'Você passa o intervalo trabalhando?'],
            ['soren', 'Não sempre. Mas quando algo dá errado, costuma parar na minha mesa. E hoje há muitas coisas dando errado.']
        ],
        recall: {
            plano: 'Fiz uma lista curta do que precisamos resolver. Você comentou que ter um plano te deixa mais tranquila.',
            descoberta: 'Não preparei um roteiro completo desta vez. Você gosta de descobrir as coisas aos poucos; deixei espaço para isso.',
            flexibilidade: 'Uma tarefa atrasou. Em vez de refazer o cronograma inteiro, deixei uma margem. Lembrei da nossa conversa.'
        },
        later: 'O mais difícil é admitir que uma decisão pode estar errada, mesmo quando todas as planilhas dizem que deveria funcionar.'
    },
    theo: {
        question: 'O que você faz quando um dia não está indo muito bem?',
        options: [
            ['Uma caminhada ajuda a clarear minha cabeça.', 'Então já sei um bom caminho perto da quadra. Sem cronômetro, prometo.', 'caminhada'],
            ['Gosto de conversar com alguém em quem confio.', 'Isso é mais difícil do que parece, né? Se quiser, eu escuto.', 'conversa'],
            ['Prefiro ficar um tempo sozinha.', 'Justíssimo. Posso aprender a não preencher todo silêncio com uma piada.', 'espaço']
        ],
        intro: [
            ['theo', 'Aquele tombo foi uma estratégia para parecer acessível. Está funcionando?'],
            ['me', 'Você quase caiu de novo tentando provar isso.'],
            ['theo', 'Tá, essa parte não estava no plano. Às vezes eu me esforço demais para parecer que tudo é fácil.']
        ],
        recall: {
            caminhada: 'Depois do treino vou fazer aquele caminho sem cronômetro. Se quiser companhia, me procura.',
            conversa: 'Você disse que conversar ajuda nos dias ruins. Hoje eu precisava disso também. Sem piada, dessa vez.',
            espaço: 'O treino foi barulhento demais. Vou ficar um pouco quieto. Você me fez perceber que não tem problema precisar disso.'
        },
        later: 'O treinador quer que eu seja exemplo para o time. Eu queria que alguém lembrasse que exemplo também erra arremesso.'
    },
    ezra: {
        question: 'Se pudesse guardar uma imagem de hoje, o que escolheria?',
        options: [
            ['A luz entrando pela janela.', 'Eu também. Ela muda a cada minuto, mas parece que ninguém percebe.', 'luz'],
            ['As pessoas que conheci.', 'É uma boa maneira de contar uma história, desde que elas queiram fazer parte dela.', 'pessoas'],
            ['Algum detalhe que quase passou despercebido.', 'Esse é o meu tipo favorito de fotografia. O que não pede atenção.', 'detalhes']
        ],
        intro: [
            ['ezra', 'Posso perguntar uma coisa? Você costuma reparar no que está em volta quando chega a um lugar novo?'],
            ['me', 'Hoje eu estava mais ocupada tentando não errar o corredor.'],
            ['ezra', 'Entendo. Às vezes uma foto me ajuda a lembrar de um lugar antes que ele vire rotina.']
        ],
        recall: {
            luz: 'A janela da biblioteca estava com aquela luz que você escolheria guardar. Tirei uma foto antes que mudasse.',
            pessoas: 'Pedi autorização para fotografar dois alunos preparando o festival. Lembrei que você gosta das histórias das pessoas.',
            detalhes: 'Achei um detalhe quase invisível no mural. Acho que você também teria reparado.'
        },
        later: 'Uma fotografia pode ser verdadeira e ainda assim esconder quase tudo que aconteceu fora do enquadramento.'
    },
    valentim: {
        question: 'O que você mais gosta em uma boa história?',
        options: [
            ['Personagens que parecem pessoas de verdade.', 'Então vou precisar cortar algumas falas bonitas que não parecem humanas.', 'pessoas reais'],
            ['Um mistério que muda de significado no final.', 'Uma leitora perigosa. Vou precisar esconder melhor as pistas.', 'mistério'],
            ['Momentos simples, sem grandes discursos.', 'Uma afronta ao meu estilo, mas talvez seja exatamente o que falta.', 'simplicidade']
        ],
        intro: [
            ['valentim', 'O jardim é meu camarim improvisado. As árvores são uma plateia excelente: nunca pedem autógrafos.'],
            ['me', 'E você precisa de uma plateia o tempo todo?'],
            ['valentim', 'Pergunta inconvenientemente boa. Às vezes é mais fácil interpretar um papel do que explicar o que estou sentindo.']
        ],
        recall: {
            'pessoas reais': 'Cortei uma fala do roteiro porque ninguém falaria daquele jeito na vida real. Você teria reclamado, com razão.',
            'mistério': 'Encontrei uma anotação no roteiro que muda o sentido da cena final. Pensei que você gostaria de vê-la.',
            simplicidade: 'Hoje ensaiei uma cena sem nenhuma grande declaração. Descobri que uma pausa pode dizer bastante.'
        },
        later: 'No teatro, uma pessoa pode dizer a verdade interpretando uma mentira. Fora do palco, prefiro não depender desse truque.'
    }
};

function factChoice42(id) {
    const c = characterFacts42[id];
    return {who: id, text: c.question, choices: c.options.map(([text, answer, fact]) =>
        ({text, answer, fact, key: 'preference'}))};
}

function recall42(id) {
    const fact = story42().facts[id]?.preference;
    const c = characterFacts42[id];
    return c?.recall[fact] || c?.later || '';
}

// Cada reencontro tem um propósito diferente; lembrar não é repetir a mesma fala.
const chapterDialogue42 = {
    dante: {
        e3:'Achei o papel depois que desliguei o amplificador. O ensaio já tinha terminado; quem estava no corredor não podia estar ouvindo a banda.',
        e4:'Essa parte da montagem não precisa de duas pessoas, mas ensaiar com alguém ouvindo muda completamente o resultado. Você me ajuda a testar?',
        e5:'Passei dias achando que o festival era só uma disputa por espaço. Agora consigo entender por que aquela turma antiga insistiu em deixar uma lembrança.'
    },
    soren: {
        e3:'A lista oficial ficou comigo desde ontem. Se alguém alterou um horário no mural, preciso saber se a alteração veio da secretaria ou de uma cópia.',
        e4:'Consegui delegar duas tarefas antes de você chegar. Não é uma grande conquista para qualquer outra pessoa, mas para mim é um começo.',
        e5:'Não vou colocar nomes de ex-alunos no relatório sem autorização. O conselho precisa aprender com o erro, não transformar a história deles em espetáculo.'
    },
    theo: {
        e3:'Eu estava recolhendo as bolas perto da saída quando vi a pessoa com os papéis. Lembro da pasta, não do rosto. Não quero inventar o resto.',
        e4:'Hoje não tem placar. Separei as caixas por tamanho e reservei uma pausa para a gente comer alguma coisa antes de continuar.',
        e5:'Aquela turma também devia estar contando os dias para subir ao palco. Fico pensando em como seria treinar tanto e, no último minuto, ficar sem jogo.'
    },
    ezra: {
        e3:'Quando fiz a foto, nem sabia que o envelope existia. Por isso ela pode ajudar: não escolhi o enquadramento tentando provar uma hipótese.',
        e4:'Reservei um canto da exposição para o que não aparece nos retratos oficiais. As mãos pintadas de tinta, os materiais esquecidos, os bastidores.',
        e5:'Podemos registrar a caixa como parte da história da escola. Mas a fotografia antiga pertence às pessoas que estão nela; não vou publicar sem perguntar.'
    },
    valentim: {
        e3:'Uma fala fora do roteiro muda de sentido. Antes de discutir a intenção de quem colocou o bilhete no mural, vamos descobrir de qual cena saiu.',
        e4:'Passei a manhã cortando falas que soavam impressionantes, mas não diziam nada. Você pode me interromper se eu voltar a fazer isso fora do palco.',
        e5:'Uma apresentação cancelada é uma história que ninguém chegou a ouvir. Talvez o festival possa devolver esse espaço sem tentar reescrever o passado.'
    }
};
const callback42 = {
    dante: {rock:'Quer testar a passagem mais pesada do ensaio?',letra:'Trouxe a letra impressa; marquei a parte que ainda não funciona.',silêncio:'Desliguei o amplificador. Temos alguns minutos sem barulho.'},
    soren: {plano:'Deixei as tarefas em três etapas. Podemos revisar juntas.',descoberta:'Escolha por onde começamos; não determinei a ordem.',flexibilidade:'Reservei uma margem para mudarmos de ideia sem refazer tudo.'},
    theo: {caminhada:'Quando terminar aqui, vou dar uma volta. Sem transformar em treino.',conversa:'Depois dessa montagem, quero ouvir como foi seu dia de verdade.',espaço:'Se precisar de uma pausa sem companhia, não precisa inventar desculpa.'},
    ezra: {luz:'Guardei a mesa perto da janela para observarmos a luz.',pessoas:'Separei algumas fotos de bastidores autorizadas pelos alunos.',detalhes:'Tem uma pequena fotografia que quase ficou de fora da exposição.'},
    valentim: {'pessoas reais':'Troquei um monólogo por uma conversa que parece de verdade.','mistério':'Deixei uma pista sutil na primeira cena. Quero ver se você percebe.','simplicidade':'Hoje o ensaio termina com uma pausa, sem discurso final.'}
};
const messageRecall42 = {
    dante: {rock:'Achei uma gravação que tem a guitarra do jeito que você gosta. Vou levar para o próximo ensaio.',letra:'Terminei a estrofe que mencionei. Posso te mostrar a letra quando nos encontrarmos?',silêncio:'Vou ensaiar mais cedo amanhã. Deixei o intervalo livre, sem barulho.'},
    soren: {plano:'O cronograma do festival já está disponível. Marquei as três tarefas essenciais para facilitar a leitura.',descoberta:'Há uma atividade nova no festival que ainda não anunciei. Vou deixar você descobrir quando chegar.',flexibilidade:'O cronograma mudou, mas deixei um horário livre. Não é necessário reorganizar tudo.'},
    theo: {caminhada:'Encontrei um caminho atrás do ginásio que não parece uma pista de corrida. Acho que combina com você.',conversa:'Hoje o treino foi puxado. Se estiver livre depois, queria conversar sem fingir que foi tudo engraçado.',espaço:'Não precisa responder agora. Só queria te avisar que o treino terminou e está tudo bem.'},
    ezra: {luz:'A luz entrou pela janela às quatro. Guardei uma foto antes que mudasse.',pessoas:'Consegui autorização para registrar os bastidores. As histórias dos alunos vão aparecer na exposição.',detalhes:'Achei uma anotação minúscula numa foto do festival. Você foi a primeira pessoa em quem pensei.'},
    valentim: {'pessoas reais':'O diretor aprovou a cena nova. Menos frases de efeito, mais conversa de verdade.','mistério':'A última página do roteiro mudou de sentido depois que encontrei uma anotação. Você vai gostar de conferir.','simplicidade':'Conseguimos ensaiar uma cena inteira sem uma grande declaração. Um pequeno milagre.'}
};

const chapterScenes42 = {
    intro0: [
        ['me', 'O uniforme estava dobrado sobre a cadeira havia dois dias. Na noite anterior eu revisei o mapa do colégio tantas vezes que já sabia onde ficava a biblioteca, mas ainda não sabia onde eu me encaixava.'],
        [null, 'Você abre a janela. Lá fora, o ônibus da manhã passa pela rua. Pela primeira vez, ninguém na sua antiga escola sabe onde você estará depois do sinal.'],
        ['me', 'Não quero passar o ano inteiro tentando ser alguém que pareça interessante. Talvez hoje eu possa simplesmente conhecer as pessoas e ver o que acontece.']
    ],
    gate0: [
        [null, 'Perto do portão, dois alunos carregam placas de madeira. Uma delas anuncia o Festival de Bellmont. Outra tem uma data riscada a caneta, como se o programa ainda estivesse sendo decidido.'],
        ['me', 'Primeiro dia e já parece que entrei no meio de uma história. Espero descobrir o começo.']
    ],
    gate3: [
        ['mabel', 'O festival divide o colégio inteiro. Tem gente que vive para o palco, gente que só quer a nota de participação e gente que tenta colocar tudo numa planilha.'],
        ['me', 'Deixa eu adivinhar: você é a pessoa que sabe de tudo antes de todo mundo.'],
        ['mabel', 'Eu prefiro chamar de serviço de utilidade pública. Mas, sério, se alguém te tratar mal, não precisa fingir que gostou para fazer amizade.']
    ],
    scarlett: [
        [null, 'O último aviso do dia aparece no mural. Entre os papéis de inscrição dos clubes, você nota um espaço reservado para uma apresentação que ainda não tem título.'],
        ['me', 'Passei o dia conhecendo pessoas que parecem pertencer a este lugar de formas completamente diferentes. Talvez não seja obrigatório escolher o meu lugar tão depressa.']
    ],
    ending: [
        ['me', 'Em casa, tiro os sapatos e coloco sobre a mesa as pequenas lembranças de hoje. Não são troféus. São detalhes que talvez eu não entendesse se tivesse passado o dia tentando impressionar todo mundo.'],
        [null, 'O celular vibra. Você decide que pode ler as mensagens depois. Amanhã haverá tempo para retomar as conversas.']
    ],
    e2intro: [
        ['me', 'O caminho até Bellmont já parece um pouco mais familiar. Mesmo assim, há uma coisa diferente no portão: os cartazes do festival foram reorganizados durante a noite.'],
        [null, 'Dois horários foram riscados. Um grupo discute perto da entrada, e uma professora pede que parem de fotografar o mural antes que a situação piore.'],
        ['me', 'Ontem eu estava preocupada em decorar nomes. Hoje parece que vou precisar aprender como essas pessoas lidam quando as coisas não saem como esperavam.']
    ],
    e2mabel: [
        ['mabel', 'Antes que você acredite em tudo que eu falar: vi os cartazes, mas não vi quem mudou os horários. Tem diferença, tá?'],
        ['me', 'Uma jornalista investigativa em treinamento.'],
        ['mabel', 'Não conta pra Raven. Ela vai exigir fontes e eu só tenho duas testemunhas que discordam uma da outra.']
    ],
    e2ending: [
        [null, 'No fim da tarde, os clubes voltam aos ensaios. O mural está menos caótico, mas o espaço da apresentação sem título continua vazio.'],
        ['me', 'Consertar o horário resolveu parte do problema. Não explicou por que alguém parecia tão interessado em impedir aquela apresentação.']
    ],
    e3intro: [
        [null, 'A fita que prende o envelope ao mural é de uma cor diferente das usadas pela comissão. Há alunos formando uma roda, cada um repetindo uma versão mais exagerada do que ouviu.'],
        ['me', 'Se eu perguntar a cinco pessoas, provavelmente vou receber seis histórias. Melhor começar pelo que consigo verificar.']
    ],
    e3scarlett: [
        ['scarlett', 'Pedi que ninguém tire os avisos do mural. Se alguém tiver uma informação concreta, quero ouvi-la sem uma plateia em volta.'],
        ['me', 'Você acha que alguém fez isso para atrapalhar o festival?'],
        ['scarlett', 'Não sei. E é justamente por isso que não vou escolher um culpado antes de ouvir os clubes.']
    ],
    e3deduce: [
        ['me', 'Espalho as anotações sobre a mesa. Uma pista isolada pode significar quase qualquer coisa. Juntas, elas precisam explicar a mesma sequência de acontecimentos.'],
        [null, 'Você risca as hipóteses que dependem apenas de boatos. O problema não é encontrar a história mais emocionante; é encontrar a que não exige inventar uma parte para funcionar.']
    ],
    e3ending: [
        ['me', 'O caso está resolvido, mas o alívio não é completo. A folha do roteiro trouxe uma frase antiga de Bellmont, e ninguém explicou por que ela importava tanto.'],
        [null, 'Antes de sair, você vê a comissão recolher os cartazes e guardar o roteiro. O festival vai continuar. A pergunta é o que mais ficou fora daquela cena.']
    ],
    e4intro: [
        ['me', 'Os preparativos transformaram o corredor em um labirinto de caixas, tecidos e instrumentos. Ontem todos procuravam um culpado. Hoje precisam trabalhar juntos.'],
        ['mabel', 'Tenho uma regra para as duplas: não escolhe alguém só porque seria bonito ver vocês juntos num pôster. Vai ter trabalho de verdade.'],
        ['me', 'Então você finalmente está admitindo que não é tudo sobre romance?'],
        ['mabel', 'Eu disse que tem trabalho. Não exagere na interpretação.']
    ],
    e4pick: [
        [null, 'Cada tarefa tem um pequeno cartão: cenário, música, registro fotográfico, logística ou ensaio. Nenhum deles pode ser resolvido por uma pessoa sozinha sem esforço extra.'],
        ['me', 'Posso escolher alguém por quem tenho interesse, alguém com quem trabalho bem ou uma parceria que ainda não conheço. Nenhuma dessas escolhas precisa definir o resto da minha vida.']
    ],
    e4ending: [
        [null, 'As últimas caixas são guardadas e as luzes do palco se apagam. No canto de uma caixa de material, a comissão encontra um símbolo antigo do colégio.'],
        ['me', 'O mesmo brasão está desenhado em uma das cópias do roteiro. Talvez o festival deste ano esteja recuperando algo que a escola preferiu esquecer.']
    ],
    e5intro: [
        [null, 'A porta do terraço range. O lugar está vazio, exceto por uma caixa antiga protegida da chuva sob uma cobertura. Há uma fotografia desbotada presa à tampa.'],
        ['me', 'Passei os últimos dias aprendendo que nem todo segredo é um convite para investigar. Alguns são lembranças que alguém ainda não sabe como contar.']
    ],
    e5choice: [
        [null, 'A fotografia mostra um grupo de alunos diante de um palco ainda incompleto. Atrás dela há uma data, um nome de apresentação e uma breve anotação sobre o cancelamento.'],
        ['me', 'A carta não parece acusar uma pessoa. Ela descreve o que aconteceu e pede que a próxima comissão não repita o mesmo erro. Talvez a verdade seja menos confortável do que um culpado fácil.']
    ],
    e5ending: [
        [null, 'No fim do dia, uma nova folha é colocada no mural. Desta vez, ninguém precisa adivinhar o que a mensagem significa: a apresentação será lembrada com autorização e cuidado.'],
        ['me', 'Bellmont não se tornou um lugar perfeito. Ainda existem horários impossíveis, conversas difíceis e pessoas que nem sempre dizem o que sentem. Mas agora eu conheço um pouco da história por trás de tudo isso.'],
        ['me', 'E, pela primeira vez desde que cheguei, não estou pensando apenas em encontrar meu lugar. Estou pensando no que quero fazer com ele.']
    ]
};

function extraScene42() {
    if (!state) return null;
    const n = state.node;
    let rows = chapterScenes42[n];
    const id = (n === 'enc3' ? encounters[state.loc]?.who :
        n === 'e2meet' ? ep2[state.loc]?.who :
        n === 'e3meet' ? ep3[state.loc]?.who :
        n === 'e4remember' ? state.e4?.partner :
        n === 'e5moment' ? state.e5?.partner : null);
    const c = characterFacts42[id];
    if (c && n === 'enc3') rows = [...c.intro, factChoice42(id)];
    if (c && n === 'e2meet') rows = [
        ...(story42().facts[id]?.preference ? [[id, recall42(id)]] : []),
        [id, c.later]
    ];
    if (c && n === 'e3meet') rows = [
        [id, chapterDialogue42[id].e3]
    ];
    if (c && n === 'e4remember') rows = [
        [id, chapterDialogue42[id].e4],
        ...(callback42[id][story42().facts[id]?.preference] ? [[id, callback42[id][story42().facts[id].preference]]] : [])
    ];
    if (c && n === 'e4remember') {
        const reply = (story42().memories[id] || []).findLast(e =>
            e.kind === 'reply' && e.chapter < state.episode &&
            Object.values(messageRecall42[id]).includes(e.context));
        if (reply) rows.push([id, reply.text === 'Prefiro conversar pessoalmente quando der.'
            ? 'Você preferiu falar pessoalmente em vez de continuar pelo celular. Estou aqui agora, se quiser retomar o assunto.'
            : 'Separei aquilo que combinamos pelo celular. Podemos conferir depois que o trabalho terminar.']);
    }
    if (c && n === 'e5moment') rows = [
        [id, chapterDialogue42[id].e5]
    ];
    if (!rows?.length) return null;
    const key = [state.episode, n, id || 'common'].join(':');
    const scenes = story42().scenes;
    let p = scenes[key];
    if (!p || !Number.isInteger(p.index) || p.index < 0 || (p.answer !== null && typeof p.answer !== 'string')) p = scenes[key] = {index: 0, answer: null};
    if (p.index >= rows.length) return null;
    const row = rows[p.index];
    return {key, p, row: Array.isArray(row) ? {who: row[0], text: row[1]} : row, length: rows.length};
}

const currentBefore42 = current;
current = function () {
    const scene = extraScene42();
    if (!scene) {
        if (state.node === 'e2intro') return dialogue('me','Segundo dia em Bellmont. Mabel comentou sobre os cartazes do festival. Preciso entender o que mudou antes de me envolver na confusão.');
        if (state.node === 'final0' && state.ending === 'theo' &&
            !state.log.some(x => x.who === 'theo' && String(x.choice || '').toLowerCase().includes('chocolate'))) {
            return dialogue('theo','Ei! Trouxe chocolate para depois do treino. Quer dividir comigo?',finals.theo.choices,'smile');
        }
        return currentBefore42();
    }
    const {p, row} = scene;
    return dialogue(row.who, p.answer || row.text, p.answer ? null : row.choices?.map(x => x.text) || null);
};
const nextBefore42 = next;
next = function () {
    const scene = extraScene42();
    if (!scene) return nextBefore42();
    if (scene.row.choices && !scene.p.answer) return;
    scene.p.index++;
    scene.p.answer = null;
    // A cena nova substitui a antiga lembrança genérica do capítulo 4.
    if (state.node === 'e4remember' && scene.p.index >= scene.length) return nextBefore42();
    update();
};
const chooseBefore42 = choose;
choose = function (i) {
    const scene = extraScene42();
    if (!scene) return chooseBefore42(i);
    const choice = scene.row.choices?.[i];
    if (!choice || scene.p.answer) return;
    const id = scene.row.who;
    (story42().facts[id] ||= {})[choice.key] = choice.fact;
    state.log.push({who:id, choice:choice.text, aff:0, trust:1, chapter42:state.episode});
    state.trust[id] = (state.trust[id] || 0) + 1;
    scene.p.answer = choice.answer;
    update();
};

// BellPhone: mensagens antigas permanecem no arquivo, não na caixa de entrada.
function liveMessage42(m) {
    return m && (m.chapter42 || state.episode) === state.episode;
}
const eventsBefore42 = events94;
events94 = id => eventsBefore42(id).filter(e => liveMessage42(state.messages[e.i]));
const pendingBefore42 = pendingList94;
pendingList94 = id => pendingBefore42(id).filter(({m}) => liveMessage42(m));
unread90 = function (id = null) {
    const d = data90();
    return state.messages.reduce((n, m, i) =>
        n + Number(liveMessage42(m) && !m.topic7 && !d.read.includes(i) && (!id || m.who === id)), 0);
};

// Conserva a tela de convites, mas deixa de criar uma avalanche de notificações.
const pushBefore42 = push90;
push90 = function (flag, who, text, extra = {}) {
    if (state.messages.some(m => m.who === who && m.text === (extra.text || text))) {
        state.flags[flag] = true;
        return false;
    }
    return pushBefore42(flag, who, text, {...extra, chapter42: state.episode});
};

// As mensagens de afinidade antigas eram disparadas em todo update().
// Os acontecimentos da história ainda enviam suas mensagens diretamente.
seed7 = function () {};

const chapterMessageNodes42 = {2:'e2map', 3:'e3map', 4:'e4pick', 5:'e5map'};
seed90 = function () {
    if (!state) return false;
    syncStory42();
    const ep = state.episode;
    if (chapterMessageNodes42[ep] !== state.node) return false;
    const eligible = people12.filter(id => profileKnown(id) && (state.trust[id] || 0) >= 8);
    eligible.sort((a,b) => (state.trust[b] || 0) - (state.trust[a] || 0));
    let changed = false;
    const who = eligible.find(id => messageRecall42[id]?.[story42().facts[id]?.preference] && !state.flags['chapter42:person:' + id]);
    if (who && !state.flags['chapter42:recall:' + ep]) {
        const fact = story42().facts[who].preference;
        const text = messageRecall42[who][fact];
        state.flags['chapter42:person:' + who] = true;
        changed = push90('chapter42:recall:' + ep, who, text, {storyRecall42:true}) || changed;
    }
    const d = data90();
    if (!state.flags['chapter42:invite:' + ep] && !Object.values(d.invites).some(x => ['pending','accepted'].includes(x.status))) {
        const id = eligible.find(x => phoneData90[x] && !d.invites[x]);
        if (id) {
            d.invites[id] = {status:'pending', day:ep};
            changed = push90('chapter42:invite:' + ep, id, phoneData90[id].invite, {invite90:id}) || changed;
        }
    }
    return changed;
};

// Respostas específicas para os recados de cada encontro principal.
const storyReplies42 = {
    dante: [
        ['A música era sua? Gostei do refrão.','Só não deixa isso virar assunto do corredor. Ainda está incompleta.'],
        ['Quero ouvir a versão nova quando terminar.','Fechado. Vou levar a gravação para o ensaio.'],
        ['Pode deixar. Da próxima vez bato na porta.','Finalmente alguém que respeita o ritual.']
    ],
    soren: [
        ['Obrigada pelo aviso. Vou guardar o mapa.','Se precisar localizar outra sala, passe no conselho.'],
        ['Fico feliz que a questão dos horários tenha sido resolvida.','Agora podemos retomar os ensaios sem mais alterações no mural.'],
        ['Vou deixar a lista com você até reunirmos as pistas.','Certo. Não vou divulgar as anotações antes de confirmar os fatos.']
    ],
    theo: [
        ['Viva e guardando o segredo do ginásio.','Meu orgulho agradece. Até o próximo treino!'],
        ['Três cestas! Já é um começo e tanto.','A próxima meta é quatro. Sem pressão desnecessária.'],
        ['A investigação acabou. Panquecas parecem uma boa recompensa.','Quando tiver tempo, combinamos. Sem mistério dessa vez.']
    ],
    ezra: [
        ['Obrigada por me mostrar a fotografia.','Vou guardar uma cópia para a próxima vez que nos encontrarmos.'],
        ['Quero ver como ficou a legenda.','Deixei a versão final junto às fotos da exposição.'],
        ['Imagino como a luz do jardim deve ter ficado.','Foi um daqueles instantes que acabam antes de a gente perceber.']
    ],
    valentim: [
        ['Estou conhecendo Bellmont aos poucos.','É uma escola que fica mais interessante depois das primeiras impressões.'],
        ['Prometo guardar o segredo da promoção.','Uma colega discreta vale mais que uma plateia inteira.'],
        ['Sem roteiro? Agora fiquei curiosa.','Desta vez vou deixar a conversa acontecer por conta própria.']
    ]
};
const recallReplies42 = {
    dante:['Quero conferir no próximo ensaio.','Vou preparar o material e te aviso quando estiver pronto.'],
    soren:['Obrigada por considerar o que eu te contei.','Foi útil pensar nisso ao reorganizar as tarefas.'],
    theo:['Fico feliz que você tenha lembrado.','Pode deixar, vou respeitar o que combinamos.'],
    ezra:['Quero ver quando nos encontrarmos.','Vou guardar esse registro para te mostrar pessoalmente.'],
    valentim:['Quero saber como ficou a cena.','Vou deixar o roteiro separado para você.']
};
const repliesBefore42 = replies90;
replies90 = function(id,m) {
    let pair;
    if (m.storyRecall42) pair = recallReplies42[id];
    else {
        const sources = [encounters,ep2,ep3];
        const i = sources.findIndex(src => Object.values(src).some(e=>e.who===id && e.msg===m.text));
        if(i>=0) pair = storyReplies42[id]?.[i];
    }
    if (!pair) return repliesBefore42(id,m);
    return [
        [pair[0],pair[1],1,2,'Empatia'],
        ['Prefiro conversar pessoalmente quando der.','Combinado. Não precisa responder agora.',0,1,'Carisma']
    ];
};

// Não repete os mesmos tópicos roteirizados em cada capítulo.
const topicBefore42 = topic7;
function topicUsed42(id,i) {
    return Object.keys(state.phone7?.topics || {}).some(k => k.startsWith(id + ':' + i + ':') && state.phone7.topics[k]);
}
topic7 = function (id,i) {
    if (topicUsed42(id,i)) return toast('Vocês já conversaram sobre isso.');
    return topicBefore42(id,i);
};
const threadBefore42 = thread90;
thread90 = function (id) {
    return threadBefore42(id).replace(/<button[^>]*data-act="bp90topic"[^>]*>/g, tag => {
        const i = Number(tag.match(/data-i="(\d+)"/)?.[1]);
        return topicUsed42(id,i) && !/\bdisabled\b/.test(tag) ? tag.replace('>', ' disabled>') : tag;
    });
};

// Lista atual e arquivo: não há reindexação nem cópias do vetor de mensagens.
chats90 = function () {
    const d = data90();
    const archive = filter90 === 'archive';
    const button = button90('bp90filter', archive ? 'Voltar às conversas' : 'Arquivo',
        'data-id="' + (archive ? 'all' : 'archive') + '"');
    if (archive) {
        const rows = state.messages.map((m,i)=>({m,i,r:state.replied[i]}))
            .filter(({m,i,r})=>!liveMessage42(m) && (r || d.stars.includes(i) || m.invite90 || m.invite5))
            .reverse().map(({m,r})=>`<article class="bppost"><b>${esc(name90(m.who))} · Capítulo ${m.chapter42}</b><p>${esc(m.text)}</p>
                ${r ? '<p>Você: '+esc(r.text)+'</p><p>'+esc(r.answer||'')+'</p>' : ''}</article>`).join('');
        return `<div class="bpsection"><h3>Arquivo de conversas</h3><p>Respostas, favoritas e convites anteriores ficam aqui, sem gerar notificações.</p>${button}${rows || '<p>Nenhuma conversa arquivada.</p>'}</div>`;
    }
    const active = [...new Set(state.messages.filter(liveMessage42).map(m=>m.who).filter(id=>chars[id]))];
    const list = active.filter(id => filter90 !== 'unread' || unread90(id))
        .sort((a,b)=>(last94(b)?.pos ?? -1)-(last94(a)?.pos ?? -1));
    const q = search94.toLocaleLowerCase('pt-BR');
    const contact = (id,text,unread=0) => `<button class="bpcontact contact94" data-act="bp90chat" data-id="${id}"
        data-search="${esc(name90(id).toLocaleLowerCase('pt-BR'))}" aria-pressed="${chat90===id}"
        ${q&&!name90(id).toLocaleLowerCase('pt-BR').includes(q)?'hidden':''}>
        ${face90(id)}<span><b>${esc(name90(id))}</b><small>${esc(text)}</small></span>
        ${unread?pill90(String(unread)):''}</button>`;
    const cards = filter90==='stars'
        ? d.stars.filter(i=>liveMessage42(state.messages[i])).map(i=>contact(state.messages[i].who,state.messages[i].text)).join('')
        : list.map(id=>{const e=last94(id);return contact(id,(e?.kind==='out'?'Você: ':'')+(e?.text||''),unread90(id));}).join('');
    const body = chat90==='group' && state.episode>=4
        ? '<div class="thread94 group94"><div class="history94">'+group90()+'</div></div>'
        : chat90 && (active.includes(chat90)||known90(chat90)) ? thread90(chat90)
        : '<div class="bpempty"><h3>Um novo capítulo.</h3><p>As mensagens atuais aparecem aqui. Consulte o arquivo para rever conversas importantes.</p></div>';
    return `<div class="bpinbox inbox94"><div class="bpinboxleft">
        <h3>Conversas · Capítulo ${state.episode}</h3>
        <input id="search94" placeholder="Buscar contato" aria-label="Buscar contato" value="${esc(search94)}">
        <div class="bpactions filters94">${[['all','Todas'],['unread','Não lidas'],['stars','Favoritas']].map(([k,n])=>button90('bp90filter',n,`data-id="${k}" aria-pressed="${filter90===k}"`)).join('')}${button}</div>
        <div class="contacts94">${cards||'<p class="bpmuted">Nenhuma mensagem neste filtro.</p>'}
        ${state.episode>=4?button90('bp90chat','Grupo de Bellmont','data-id="group"'):''}</div>
        </div><div class="bpthread">${body}</div></div>`;
};

// Preferências reais também aparecem na ficha, sem revelar memórias de outros personagens.
const memoryBefore42 = showProfile;
showProfile = function (id, mood = 'neutral') {
    memoryBefore42(id,mood);
    if (!state || !profileKnown(id)) return;
    const fact = story42().facts[id]?.preference;
    const list = story42().memories[id] || [];
    if (!fact && !list.length) return;
    const panel = document.querySelector('#modal .panel');
    panel?.insertAdjacentHTML('beforeend', `<section class="memory12"><h3>O que ficou entre vocês</h3>
        ${fact ? '<p>Preferência lembrada: '+esc(fact)+'</p>' : ''}
        ${list.slice(-3).map(e=>'<p><small>Capítulo '+e.chapter+'</small> · '+esc(e.text)+'</p>').join('')}</section>`);
};
