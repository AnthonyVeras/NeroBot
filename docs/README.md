# Documentação do NeroBot

## Visão Geral

Esta pasta contém toda a documentação do projeto NeroBot. Os documentos aqui presentes detalham o estado atual do projeto, planos futuros, guias de desenvolvimento e contribuição, bem como informações técnicas importantes.

## Estrutura da Documentação

| Arquivo | Descrição |
|---------|-----------|
| [status.md](status.md) | Status atual da migração para TypeScript, com gráficos e tabelas do progresso e próximos passos |
| [problems.md](problems.md) | Principais problemas atuais no projeto, divididos em níveis e categorias, com prioridades |
| [context.md](context.md) | Contexto atual do projeto, descrevendo a arquitetura e componentes |
| [implementation-plan.md](implementation-plan.md) | Plano para implementação de novas funcionalidades após a migração |
| [organization.md](organization.md) | Organização do projeto, estrutura de diretórios, convenções e padrões |
| [guide.md](guide.md) | Guia do desenvolvedor, com instruções detalhadas para trabalhar no projeto |
| [key-changes.md](key-changes.md) | Principais mudanças realizadas durante a migração para TypeScript |
| [roadmap.md](roadmap.md) | Roteiro de longo prazo para o projeto |
| [contribution-guidelines.md](contribution-guidelines.md) | Diretrizes para contribuições no projeto |

## Como Navegar

A documentação foi organizada para atender a diferentes necessidades:

### Para Novos Desenvolvedores

1. Comece com [context.md](context.md) para entender o projeto
2. Leia [organization.md](organization.md) para familiarizar-se com a estrutura
3. Siga o [guide.md](guide.md) para configurar seu ambiente e entender o workflow
4. Consulte [contribution-guidelines.md](contribution-guidelines.md) antes de contribuir

### Para Acompanhar o Progresso da Migração

1. Veja [status.md](status.md) para o estado atual da migração
2. Consulte [problems.md](problems.md) para conhecer os desafios em andamento
3. Leia [key-changes.md](key-changes.md) para entender as alterações já realizadas

### Para Planejamento Futuro

1. Consulte [implementation-plan.md](implementation-plan.md) para as próximas funcionalidades
2. Veja [roadmap.md](roadmap.md) para o plano de longo prazo

## Atualização da Documentação

Esta documentação é atualizada regularmente durante o processo de migração e desenvolvimento. Ao fazer alterações no código que afetam a arquitetura, funcionalidades ou workflows, por favor, atualize a documentação correspondente.

### Processo de Atualização

1. Identifique quais documentos precisam ser atualizados
2. Faça as alterações necessárias, mantendo a formatação e estilo consistentes
3. Adicione a data da última atualização no início do documento modificado
4. Inclua as alterações da documentação no mesmo pull request das mudanças de código

## Formatação

Toda a documentação é escrita em Markdown para facilitar a leitura tanto no GitHub quanto em editores locais. Utilizamos:

- Títulos com `#`, `##`, `###` etc.
- Listas com `-` ou números
- Tabelas para informações estruturadas
- Blocos de código com \`\`\` para exemplos de código
- Gráficos com [Mermaid](https://mermaid-js.github.io/mermaid/#/) quando aplicável

## Contribuindo para a Documentação

Melhorias na documentação são sempre bem-vindas. Se você identificar informações desatualizadas, confusas ou faltantes, sinta-se à vontade para contribuir seguindo as diretrizes em [contribution-guidelines.md](contribution-guidelines.md).

---

Para qualquer dúvida sobre a documentação, abra uma issue com o label "documentação" no repositório. 