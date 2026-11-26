# Roadmap — Depois do Sinal

O objetivo é evoluir Bellmont de uma visual novel para uma simulação de vida romântica com identidade própria. O plano é indicativo: não há datas de lançamento prometidas, e a numeração poderá mudar conforme os testes.

## Base atual — v0.14
- [x] Cinco episódios e seis interesses românticos.
- [x] Ateliê, BellPhone, quarto, cidade, calendário e BellFeed.
- [x] Mapa interativo e memória emocional por regras.
- [x] Cache compartilhado e recuperação de salvamentos.
- [x] Separação de recursos, interface e lógica em arquivos.

## Próximo ciclo — qualidade e narrativa
- [ ] Criar testes de regressão automatizados para saves, escolhas, mapa, BellPhone e ateliê.
- [ ] Testar Firefox, Chromium e telas móveis; registrar resultados reproduzíveis.
- [ ] Criar episódio 06: *Uma festa, seis problemas*.
- [ ] Introduzir consequências de escolhas e rotas independentes sem quebrar partidas antigas.

## Ciclo de atividades — Bellmont jogável
- [ ] Seis minijogos: guitarra, piano, basquete, fotografia, teatro e investigação.
- [ ] Planejador de encontros com disponibilidade, horário, atividade e desfechos.
- [ ] Roupas alternativas dos personagens preservando seus rostos e a estética anime.
- [ ] Recompensas e conquistas equilibradas, sem bloquear a narrativa principal.

## Bellmont Secrets
- [ ] Investigações, pistas, documentos colecionáveis e diferentes conclusões.
- [ ] Consequências narrativas entre investigação, amizades e romances.
- [ ] Expansão de locais e eventos secretos.

## Relacionamentos e temporada
- [ ] Confissões, namoro, amizade profunda, conflitos e reconciliações.
- [ ] Caminhos sem romance e finais alternativos.
- [ ] Episódios 07 a 12, com títulos e conteúdo sujeitos a revisão.
- [ ] Novas CGs originais em alta resolução, roupas sazonais e identidade sonora.

## Evolução técnica
- [ ] Extrair sistemas de `game.js` gradualmente em módulos com interfaces explícitas.
- [ ] Criar estratégia versionada de migração de saves e testes com fixtures anônimas.
- [ ] Separar mídias em arquivos carregados sob demanda, medir peso e consumo de memória antes/depois.
- [ ] Revisar acessibilidade, foco, contraste, teclado e movimento reduzido.
- [ ] Avaliar PWA e cache offline, preservando a distribuição local.
- [ ] Criar tags/releases e definir licenciamento após revisão dos direitos dos recursos.

## Critérios para publicar
Uma atualização só deve chegar à `main` depois de revisão, teste de partida nova e antiga, ausência de erros de console nos fluxos verificados e conferência visual. Atualizar README e CHANGELOG quando houver mudanças. Não sacrificar a direção artística ou o progresso dos jogadores por novas mecânicas.

Acompanhe propostas e problemas pelo [GitHub Issues](https://github.com/anabiasart/Depois-do-Sinal/issues).
