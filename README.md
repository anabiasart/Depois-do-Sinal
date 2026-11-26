# 🌹 Depois do Sinal

> Depois que o sinal toca, a verdadeira história começa.

![Versão](https://img.shields.io/badge/versão-0.14-9b5278)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-e8c66a?logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-76536f)

**Depois do Sinal** é uma visual novel independente de romance, drama escolar e simulação de vida, ambientada no fictício Colégio Bellmont. Explore a cidade, construa amizades, descubra segredos e escreva a própria história. A direção artística combina anime, atmosfera cinematográfica e dark academia.

[🎮 Jogar no navegador (GitHub Pages)](https://anabiasart.github.io/Depois-do-Sinal/) · [Histórico de versões](CHANGELOG.md) · [Roadmap](ROADMAP.md) · [Arquitetura](docs/ARCHITECTURE.md)

> A publicação via GitHub Pages depende da configuração de hospedagem do repositório. A execução local não depende dela.

## O que já existe na v0.14

- Cinco episódios narrativos, com escolhas, afinidade e confiança.
- Seis interesses românticos, incluindo Raven em uma história paralela.
- Protagonista personalizável, Ateliê Signature, roupas, acessórios e fotografias.
- BellPhone com mensagens, conversas coletivas, convites e BellFeed dinâmico.
- Cidade explorável com oito pontos de interesse, mapa e encontros opcionais.
- Quarto interativo, diário, decoração e galeria de ilustrações desbloqueáveis.
- Calendário, rotina dos personagens, clima, estações e memória emocional baseada em regras.
- BellCoins, três slots de salvamento, exportação/importação JSON e recuperação de cópia local.
- Interface responsiva e modo de desempenho.

### Conheça Bellmont

| Personagem | Universo |
| --- | --- |
| Dante Moreau | Música, guitarra e ironia |
| Soren Laurent | Conselho estudantil e piano |
| Theo Bennett | Esporte e amizade |
| Ezra Nightingale | Fotografia e arte |
| Valentim Beaumont | Teatro e mistério |
| Raven Ashford | Jornal escolar e escrita |

A história principal tem cinco episódios: *A garota nova*, *Péssimas primeiras impressões*, *Alguém deixou um bilhete*, *Duplas inconvenientes* e *O segredo do terraço*.

## Executar localmente

Requisitos: navegador moderno e os arquivos do projeto na mesma pasta. Não há instalação de dependências nem etapa de build obrigatória.

```bash
git clone https://github.com/anabiasart/Depois-do-Sinal.git
cd Depois-do-Sinal
```

Abra `index.html` no navegador. Como alternativa, com Python instalado, execute:

```bash
python -m http.server 8000
```

Acesse http://localhost:8000. O jogo roda no cliente, sem servidor de aplicação ou banco de dados. As artes e os áudios são incorporados aos arquivos locais.

### Salvamentos

O progresso fica no armazenamento local do navegador. Antes de atualizar, trocar de navegador, domínio ou abrir o jogo por outra URL, exporte um JSON pelo menu de salvamentos. Importe-o na nova instalação. Não envie seus saves pessoais ao GitHub.

## Estrutura

```text
Depois-do-Sinal/
├── index.html              # Entrada HTML
├── style.css               # Interface e direção visual
├── assets.js               # Artes e áudios incorporados
├── game.js                 # Motor, dados e sistemas
├── docs/
│   └── ARCHITECTURE.md     # Arquitetura e manutenção
├── CHANGELOG.md
├── ROADMAP.md
├── README.md
├── LEIA-ME.txt
└── .gitignore
```

**Stack:** HTML5, CSS3, JavaScript vanilla, DOM, Web Storage e APIs nativas do navegador. O arquivo de mídia é grande porque preserva as ilustrações originais.

## Desenvolvimento

- `main`: versão pública estável.
- `develop`: integração e testes de futuras funcionalidades.
- `feature/*` e `fix/*`: mudanças isoladas, revisadas via pull request.

```bash
git switch develop
git pull origin develop
git switch -c feature/minha-melhoria
```

Antes de abrir um PR, teste o início de uma partida, o progresso narrativo, o BellPhone, a cidade, o ateliê e a exportação/importação de saves. Não altere a chave de armazenamento sem estratégia de migração. Consulte a [arquitetura](docs/ARCHITECTURE.md) para o checklist completo.

## Créditos e direitos

Projeto criado e mantido por [@anabiasart](https://github.com/anabiasart), com apoio de ferramentas de IA no desenvolvimento e na criação visual. Personagens, narrativa e ambientação pertencem ao universo de Depois do Sinal. Este repositório ainda não declara uma licença de distribuição; a disponibilidade pública do código não implica autorização irrestrita de reutilização das artes ou do jogo.
Obs: com fins apenas de diversão <3

---

*Bellmont guarda mais histórias do que parece.* ♡
