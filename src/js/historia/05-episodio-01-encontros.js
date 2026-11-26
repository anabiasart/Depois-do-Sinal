// episodio-01-encontros | v0.14
const encounters={
  music:{
    who:'dante',
    intro:'A porta está entreaberta. Uma guitarra interrompe o silêncio. O garoto para de tocar quando percebe você.',
    line:'Você sempre invade lugares assim ou hoje é uma ocasião especial?',
    choices:[['Depende. Você sempre dá concertos particulares?',9,6,'Só para pessoas que sabem bater na porta. Mas admito que essa foi boa.'],['Desculpa, ouvi a música. Você toca muito bem.',5,7,'Valeu. Não espalha. Tenho uma reputação a preservar.'],['Nossa, que simpatia. Já estou indo.',-5,1,'A saída está atrás de você.'],],
    extra:'Dante guarda uma palheta vermelha no bolso, mas uma segunda cai ao chão.',
    gift:'Palheta vermelha',
    msg:'A música era minha. E não, você não ouviu isso de mim.',
    flag:'dante'
  },
  hall:{
    who:'soren',
    intro:'Você encontra um rapaz organizando uma pilha de fichas. Ele ergue os olhos quando você se aproxima.',
    line:'Você deve ser a nova aluna. Atrasada, por sinal. Seu formulário está incompleto.',
    choices:[['Você pode me ajudar a terminar?',7,8,'Posso. Pelo menos alguém aqui sabe pedir ajuda.'],['É o seu passatempo fiscalizar horários?',-4,0,'Não. Meu passatempo é evitar que outros desperdicem o meu tempo.'],['Já terminei. Só faltava sua assinatura.',9,5,'Interessante. Uma pessoa preparada. Que mudança agradável.']],
    extra:'Ele entrega um mapa dobrado, com anotações perfeitamente alinhadas.',
    gift:'Mapa anotado',
    msg:'A biblioteca fecha às 17h. Não perca a hora novamente.',
    flag:'soren'
  },
  gym:{
    who:'theo',
    intro:'Uma bola rola até seus pés. Um rapaz de cabelo dourado corre atrás dela, quase tropeçando no próprio cadarço.',
    line:'Por favor, diga que você não viu isso. Minha carreira esportiva depende da sua discrição.',
    choices:[['Vi tudo. Aceito chocolate em troca de silêncio.',10,5,'Negócio fechado. Gostei de você.'],['Está tudo bem? Você se machucou?',6,8,'Só meu orgulho. Ele sobrevive, infelizmente.'],['Você devia aprender a amarrar os tênis.',-3,1,'Justo. Vou incluir isso no próximo treino.']],
    extra:'Theo desenha uma carinha feliz em um adesivo do time e entrega para você.',
    gift:'Adesivo do time',
    msg:'A testemunha do meu tombo ainda está viva? 🍫',
    flag:'theo'
  },
  library:{
    who:'ezra',
    intro:'Entre as estantes, um clique discreto. O fotógrafo abaixa a câmera, apontada para a janela ao seu lado.',
    line:'Desculpa. A luz estava interessante. Não fotografei você, se é o que está pensando.',
    choices:[['Posso ver a foto?',9,7,'Pode. A maioria das pessoas nem pergunta.'],['Eu também gosto de observar a luz.',7,8,'Então talvez você entenda por que gosto daqui.'],['É melhor não fotografar estranhos mesmo.',-4,2,'Concordo. Por isso não fotografei.']],
    extra:'Ezra separa uma foto antiga do jardim e a deixa sobre a mesa.',
    gift:'Fotografia do jardim',
    msg:'Revelei a foto. Acho que você iria gostar.',
    flag:'ezra'
  },
  garden:{
    who:'valentim',
    intro:'Uma flor de cerejeira pousa sobre o banco. Um rapaz com um livro fechado no colo observa você procurar seu caminho.',
    line:'Perdida? Posso oferecer uma visita guiada. Ou uma desculpa convincente para matar aula.',
    choices:[['A visita guiada. A desculpa fica para outra ocasião.',7,6,'Prudente. Vou tentar não estragar sua primeira impressão.'],['Depende. Qual é a sua comissão?',10,4,'Finalmente, alguém que negocia. Um café talvez?'],['Obrigada, prefiro descobrir sozinha.',1,3,'Uma escolha respeitável. Até a próxima, então.']],
    extra:'Valentim oferece um marcador de livro que estava usando.',
    gift:'Marcador dourado',
    msg:'Espero que Bellmont esteja à altura das suas expectativas.',
    flag:'valentim'
  }
  
};

const finals={
  dante:{
    line:'Você voltou. Não me diga que gostou tanto assim da minha companhia.',
    choices:[['Talvez eu queira ouvir a próxima música.',8,5,'Então senta. Mas só porque você pediu.'],['Vim devolver a palheta. Não se ache.',6,4,'Você pode ficar com ela. Se quiser.']],
    title:'Uma música só nossa',
    loc:'music'
  },
  soren:{
    line:'Você encontrou tudo? Fiquei com a impressão de que teria mais perguntas.',
    choices:[['Uma só: você sempre se cobra tanto?',8,7,'Isso... não costuma ser assunto de primeiro dia. Mas obrigado por perguntar.'],['Queria agradecer pela ajuda.',6,5,'Não foi um incômodo. De verdade.']],
    title:'Além das regras',
    loc:'hall'
  },
  theo:{
    line:'Ei! Consegui seu chocolate. Promessas são promessas.',
    choices:[['Vamos dividir?',9,5,'Nossa. Estou sendo subornado de volta.'],['Você lembra mesmo das coisas, hein?',6,6,'Quando importa, sim.']],
    title:'Chocolate compartilhado',
    loc:'gym'
  },
  ezra:{
    line:'O sol está quase se pondo. A luz muda completamente daqui a pouco.',
    choices:[['Quer observar comigo?',9,7,'Quero. Não precisamos falar nada.'],['Você vai me mostrar como fotografar?',7,5,'Se você prometer não rir das primeiras tentativas.']],
    title:'A última luz',
    loc:'roof'
  },
  valentim:{
    line:'Já estava achando que precisaria inventar outro motivo para ver você.',
    choices:[['Não precisa inventar. Pode só me chamar.',9,7,'Essa é uma ideia perigosamente simples.'],['Achei que você me devia um café.',7,4,'E eu pretendo pagar minhas dívidas.']],
    title:'Um convite inesperado',
    loc:'garden'
  }
  
};
