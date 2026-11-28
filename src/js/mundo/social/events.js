const socialEvents = [
    {
        id: 'rehearsal',
        pair:['dante','soren'],
        title:'Ensaio ou regulamento?',
        text:'Dante precisa de uma sala para ensaiar. Soren tenta conciliar os horários do festival.',
        choices:['Propor um horário compartilhado','Incentivar Dante a negociar sozinho','Apenas observar'],
        trait:'cooperação',
        loc:'music',
        lines:['Preciso ensaiar. Não dá para fazer isso no corredor.','E eu preciso garantir que todos tenham acesso às salas.'],
        outcomes:['Soren reserva dois horários e Dante aceita dividir a sala.','Dante promete apresentar sua própria proposta.','Os dois retomam a discussão e procuram uma solução sem você.']
    },
    {
        id: 'team-photo',
        pair:['theo','ezra'],
        title:'Um retrato fora da quadra',
        text:'Theo quer uma foto do time, mas Ezra prefere registrar os bastidores.',
        choices:['Sugerir uma foto coletiva e outra espontânea','Deixar que resolvam a diferença','Apenas observar'],
        trait:'criatividade',
        loc:'gym',
        lines:['Uma foto do time seria uma lembrança incrível.','Prefiro fotografar o que acontece quando ninguém está posando.'],
        outcomes:['Os dois combinam uma foto coletiva e um registro espontâneo.','Theo e Ezra resolvem experimentar ideias diferentes.','Eles seguem conversando sobre o projeto.']
    },
    {
        id: 'soundtrack',
        pair:['valentim','dante'],
        title:'A trilha do espetáculo',
        text:'Valentim e Dante discordam sobre a música de uma cena do festival.',
        choices:['Ajudar a encontrar um meio-termo','Defender a liberdade artística','Apenas observar'],
        trait:'cooperação',
        loc:'hall',
        lines:['A cena precisa de uma música que acompanhe o ritmo do texto.','Se eu seguir cada marcação, a música perde a personalidade.'],
        outcomes:['Os dois ensaiam uma versão que combina as propostas.','Dante apresenta uma composição livre ao diretor.','Valentim e Dante decidem retomar o ensaio depois.']
    },
    {
        id: 'noticeboard',
        pair:['soren','ezra'],
        title:'O mural de Bellmont',
        text:'Soren quer organizar o mural; Ezra quer deixar espaço para trabalhos espontâneos.',
        choices:['Reservar espaço para os dois projetos','Sugerir uma exposição livre','Apenas observar'],
        trait:'criatividade',
        loc:'library',
        lines:['O mural precisa de alguma organização.','E também precisa de espaço para coisas que não estavam previstas.'],
        outcomes:['Eles dividem o mural em duas seções.','Ezra propõe uma exposição sem tema obrigatório.','Os dois continuam planejando o mural.']
    }
];
