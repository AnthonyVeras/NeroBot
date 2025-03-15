# Diretrizes de Contribuição

## Introdução

Obrigado por seu interesse em contribuir para o NeroBot! Este documento fornece as diretrizes para contribuir com o projeto, desde a criação de issues até o envio de pull requests. Seguir estas diretrizes ajuda a manter a qualidade do código e facilita o processo de revisão.

## Índice

1. [Código de Conduta](#código-de-conduta)
2. [Reportando Bugs](#reportando-bugs)
3. [Sugerindo Melhorias](#sugerindo-melhorias)
4. [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
5. [Estilo de Código](#estilo-de-código)
6. [Processo de Pull Request](#processo-de-pull-request)
7. [Contribuindo com Comandos](#contribuindo-com-comandos)
8. [Testes](#testes)
9. [Documentação](#documentação)
10. [Recursos Adicionais](#recursos-adicionais)

## Código de Conduta

Este projeto segue um Código de Conduta que esperamos que todos os participantes observem. Por favor, leia [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) para entender quais ações são toleradas e quais não são.

## Reportando Bugs

### Antes de Reportar

- Verifique se o bug já não foi reportado na seção de Issues
- Certifique-se de que está usando a versão mais recente do projeto
- Confira se não é um problema de configuração local

### Como Reportar

Ao criar uma issue para reportar um bug, inclua:

- Título claro e descritivo
- Passos precisos para reproduzir o problema
- Comportamento esperado e o que realmente aconteceu
- Capturas de tela, se aplicável
- Versão do NeroBot, Node.js e sistema operacional
- Quaisquer logs relevantes (ocultando informações sensíveis)

Use o template de bug disponível ao criar uma nova issue.

## Sugerindo Melhorias

As sugestões de melhorias são sempre bem-vindas. Para sugerir uma melhoria:

- Use um título claro e descritivo
- Forneça uma descrição detalhada da melhoria sugerida
- Explique por que esta melhoria seria útil para o projeto
- Inclua exemplos de como a melhoria funcionaria
- Se possível, mencione como você poderia ajudar a implementar

Use o template de feature disponível ao criar uma nova issue.

## Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js v16.0.0 ou superior
- npm v7.0.0 ou superior
- Git

### Configuração

1. Faça um fork do repositório
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/seu-usuario/nerobot.git
   cd nerobot
   ```
3. Adicione o repositório original como upstream:
   ```bash
   git remote add upstream https://github.com/repositorio-original/nerobot.git
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Configure o ambiente:
   - Crie um arquivo `.env` baseado em `.env.example`
   - Configure as variáveis necessárias para testes

### Workflow de Desenvolvimento

1. Crie uma branch a partir da branch `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/nome-da-feature
   ```
2. Faça suas alterações seguindo as convenções de código
3. Adicione testes para suas alterações, quando aplicável
4. Execute os testes para garantir que tudo está funcionando:
   ```bash
   npm test
   ```
5. Faça commit das alterações:
   ```bash
   git add .
   git commit -m "feat: descrição clara da alteração"
   ```
6. Envie para seu fork:
   ```bash
   git push origin feature/nome-da-feature
   ```
7. Crie um Pull Request para a branch `develop` do repositório original

## Estilo de Código

Nós seguimos convenções específicas para manter a consistência do código:

### TypeScript

- Use camelCase para variáveis, funções e propriedades
- Use PascalCase para classes, interfaces e tipos
- Use UPPER_SNAKE_CASE para constantes
- Adicione tipagem explícita para APIs públicas
- Evite o uso de `any`, preferindo `unknown` quando necessário
- Use espaços em vez de tabs (2 espaços por nível de indentação)
- Use ponto e vírgula no final das declarações

### Comentários

- Use comentários JSDoc para documentar funções, classes e interfaces públicas
- Mantenha os comentários atualizados quando o código muda
- Escreva comentários em português
- Seja claro e conciso nos comentários

### Commits

Seguimos a convenção de [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Alterações que não afetam o código (espaços, formatação)
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Alterações em ferramentas de build, configurações

## Processo de Pull Request

### Diretrizes para Pull Requests

- Faça pull requests para a branch `develop`, não para `main`
- Atualize sua branch com a `develop` mais recente antes de enviar
- Limite cada pull request a uma única feature ou correção
- Mantenha os pull requests pequenos e focados
- Inclua testes para novas funcionalidades ou correções de bugs
- Atualize a documentação, se necessário
- Certifique-se de que os testes passam

### Template de Pull Request

Ao criar um pull request, siga o template fornecido que inclui:

- Descrição das alterações
- Tipo de alteração (nova feature, correção, refatoração)
- Como testar
- Capturas de tela (se aplicável)
- Checklist de tarefas concluídas

### Revisão de Código

- Todos os pull requests serão revisados por pelo menos um mantenedor
- Os revisores podem solicitar alterações ou esclarecer dúvidas
- Esteja aberto a feedback e disposto a fazer alterações
- Pull requests devem ter aprovação antes de serem mesclados

## Contribuindo com Comandos

Ao adicionar novos comandos ao NeroBot, siga estas diretrizes adicionais:

### Estrutura do Comando

- Coloque o comando na pasta correta (`admin`, `member` ou `owner`)
- Siga a estrutura padrão de comandos conforme o modelo em `docs/guide.md`
- Use nomes descritivos e intuitivos para o comando
- Forneça uma descrição clara e detalhada

### Requisitos para Comandos

- Valide todos os parâmetros e entradas do usuário
- Forneça mensagens de ajuda e feedback claros
- Trate erros adequadamente usando as classes de erro do sistema
- Documente os parâmetros e uso do comando
- Adicione testes para o comando

## Testes

### Escrevendo Testes

- Escreva testes unitários para funcionalidades novas ou modificadas
- Use Jest como framework de teste
- Mantenha os testes independentes (sem dependências externas)
- Use mocks quando necessário para simular dependências externas
- Nomeie os testes de forma descritiva usando "should"

### Executando Testes

Execute os testes antes de enviar um pull request:

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes específicos
npm test -- -t "nome do teste"
```

## Documentação

### Princípios de Documentação

- Mantenha a documentação atualizada com as alterações de código
- Use português claro e acessível
- Inclua exemplos práticos quando possível
- Documente tanto o "como" quanto o "porquê"

### Tipos de Documentação

- **Comentários de Código**: Use JSDoc para documentar classes, funções e interfaces
- **README.md**: Visão geral do projeto, instruções de instalação e uso básico
- **Guias**: Instruções passo-a-passo para tarefas específicas
- **Referência de API**: Documentação detalhada de APIs e comandos
- **Documentação de Desenvolvimento**: Guias para contribuidores

## Recursos Adicionais

- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Baileys](https://github.com/whiskeysockets/baileys)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Jest - Framework de Testes](https://jestjs.io/)
- [Guia de Estilo do TypeScript da Google](https://google.github.io/styleguide/tsguide.html)

---

Estas diretrizes estão sujeitas a alterações. Verifique periodicamente se há atualizações. Agradecemos por contribuir para tornar o NeroBot melhor! 