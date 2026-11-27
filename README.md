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

Requisitos: navegador moderno e os arquivos do projeto na mesma pasta. A distribuição versionada abre diretamente, sem dependências. Para editar os fontes, use Node.js 18+ e execute o build.

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
src/js/           # Fontes JavaScript por sistema (43 arquivos)
src/css/          # Fontes CSS (18 arquivos)
src/ordem.json    # Ordem explícita de concatenação
scripts/          # Build e ferramentas de mídia
assets/bellfeed/  # Fotografias futuras
assets.js         # Mídia incorporada (migração planejada)
game.js/style.css # Gerados pelo build
index.html        # Entrada do jogo
tests/            # Regressão, navegador e fixtures fictícias
docs/             # Arquitetura e guia de edição
.github/workflows/ # Integração contínua
```

**Stack:** HTML5, CSS3, JavaScript vanilla, DOM, Web Storage e APIs nativas do navegador. O arquivo de mídia é grande porque preserva as ilustrações originais.

## Desenvolvimento

Use `main` como base estável. Crie branches temporárias para mudanças e abra PRs. A branch histórica `develop` não é mais a base recomendada; não foi apagada.

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/minha-melhoria
npm run build
npm run check
npm test
```

Edite os fontes em `src/`, não os compilados diretamente. Inclua fonte e compilados no mesmo commit. Para testes no navegador, consulte [Testes](docs/TESTES.md). Antes de publicar, confira o resultado da CI e exporte seu progresso.

## Créditos e direitos

Projeto criado e mantido por [@anabiasart](https://github.com/anabiasart), com apoio de ferramentas de IA no desenvolvimento e na criação visual. Personagens, narrativa e ambientação pertencem ao universo de Depois do Sinal. Este repositório ainda não declara uma licença de distribuição; a disponibilidade pública do código não implica autorização irrestrita de reutilização das artes ou do jogo.
Obs: com fins apenas de diversão <3

---

*Bellmont guarda mais histórias do que parece.* ♡
