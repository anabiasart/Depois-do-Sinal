# Guia de edição manual — Depois do Sinal v0.14

O projeto contém 43 arquivos JavaScript e 18 arquivos CSS organizados por responsabilidade. A concatenação na ordem declarada em src/ordem.json conserva o motor clássico. Não são módulos ES independentes.

## Como editar

1. Abra a raiz do projeto no VS Code, em uma branch temporária criada a partir de main.
2. Instale Node.js 18 ou superior, se necessário. O build e os testes unitários não exigem dependências externas. Os testes de navegador usam Playwright.
3. Edite os arquivos em src/js/ ou src/css/. Não edite game.js e style.css da raiz: são gerados.
4. Execute `npm run build`, `npm run check` e `npm test`.
5. Abra index.html e teste; salve os arquivos fonte e gerados no mesmo commit.

## Onde encontrar cada sistema

| Alteração | Arquivo em src/js/ |
| --- | --- |
| Personagens e locais | dados/03-personagens-e-locais.js |
| Biografias e atributos | dados/11-perfis-e-atributos.js |
| Diálogos e escolhas iniciais | historia/05-episodio-01-encontros.js |
| Motor inicial | historia/09-episodio-01-motor.js |
| Episódios 02–05 | historia/12-episodio-02.js, 13-episodio-03.js, 15-episodio-04.js, 19-episodio-05.js |
| Raven | historia/26-raven.js |
| Roupas e acessórios | atelie/ |
| BellPhone e mensagens | celular/ |
| BellFeed | celular/37-bellfeed-dinamico.js |
| Encontros | cidade/29-encontros-e-galeria.js |
| Mapa | cidade/36-mapa-interativo.js |
| Quarto | quarto/30-quarto-e-decoracao.js |
| Calendário e rotinas | mundo/32-calendario-clima-rotina.js |
| Memórias | mundo/33-memoria-emocional.js |
| Salvamento | core/01-midia-e-salvamento.js, 07-estado.js, 35-interface-mundo-e-slots.js, 38-integracao-estabilidade.js |
| Sprites e interface | visual/ |

Os 18 arquivos de src/css/ seguem a ordem original da cascata. Consulte a lista em src/ordem.json. Use Ctrl+Shift+F no VS Code para pesquisar uma função, fala ou classe. Algumas strings de HTML/SVG são longas e foram mantidas intactas.

### Exemplo

Em historia/05-episodio-01-encontros.js, procure encounters.music. O campo line contém a fala de Dante. Em choices, cada opção desse encontro contém texto da protagonista, pontos de afinidade, pontos de confiança e resposta do personagem. Altere os textos, evitando renomear IDs usados nos saves.

## Artes

```bash
npm run artes -- exportar
npm run artes -- substituir 378 "caminho/novo-quarto.webp"
```

A exportação cria arquivos numerados em exports/artes/. A substituição conserva o índice e cria backup em backups/. Preserve o formato, as proporções e a transparência do original; a ferramenta só verifica o formato básico. Não publique as pastas de exportações e backups.

## Git

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c feature/minha-melhoria
npm run build
npm run check
```

Para publicar suas alterações, faça commit na branch temporária e abra um pull request para main após testar. A develop fica como branch histórica. Exporte seu progresso em JSON antes de mudar de navegador ou origem. Não altere a chave de armazenamento ou a ordem de execução sem uma estratégia de migração.

## Validação e limites

Consulte [TESTES.md](TESTES.md) para os testes de regressão, Playwright e limitações. A ordem dos scripts clássicos ainda deve ser respeitada. A v0.15 está em preparação; não renomeie IDs de cenas, campos de save ou índices das mídias sem migração.
