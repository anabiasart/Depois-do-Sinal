# Fundação técnica v0.15 — testes

Esta etapa protege o comportamento da v0.14 antes de refatorar o motor. Nenhum arquivo de gameplay ou mídia foi alterado.

## Testes rápidos (Node 18+; CI usa Node 22)

```bash
npm run build
npm run check
npm test
````

Os testes executam o JavaScript real com armazenamento e DOM mínimos simulados, omitindo apenas o render inicial. As fixtures são fictícias, derivadas do contrato antigo, não arquivos de usuários nem provas de compatibilidade com todas as versões históricas. Os testes cobrem migração, rejeição de dados inválidos, round-trip, backup, falha de armazenamento, escolha de Dante e transição de capítulo, arquivo do telefone e manifesto. Não validam layout, segurança completa, áudio ou todas as rotas.

## Navegador (Python 3.12 recomendado)

```bash
python -m pip install -r tests/requirements.txt
python -m playwright install chromium firefox
python -m http.server 8000
````

Em outro terminal:

```bash
npm run test:e2e
````

O navegador padrão é Chromium. No Git Bash, execute `BROWSER=firefox npm run test:e2e` para Firefox. A suíte utiliza contextos de navegador isolados; não toca no progresso pessoal. Valida nova partida, primeira escolha, abertura do feed, exportação/importação, importação de fixture e dimensões/rolagem do BellPhone no mobile. A CI repete os testes em ambos os navegadores. Execução offline por file://, todos os capítulos, slots e contraste ainda são pendências.

## Regra para a próxima fase

Não modificar wrappers de narrativa, esquema de saves ou assets antes de verificar a linha de base. Se um teste falhar, investigar a causa; não desativar testes para obter um resultado verde. Depois, migrar uma cena de cada vez para um motor orientado a dados e comparar a progressão e as consequências.

A licença de código e artes continua uma decisão da autora. O script antigo ajustar-modais.cjs permanece no histórico e está em scripts/legacy; não executar em versões atuais.
