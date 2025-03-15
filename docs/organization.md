# Organização do Projeto

## Estrutura de Diretórios

Após a migração para TypeScript, o projeto terá a seguinte estrutura de diretórios:

```
nerobot/
├── dist/                     # Código JavaScript compilado
├── src/                      # Código-fonte TypeScript
│   ├── commands/             # Comandos do bot
│   │   ├── admin/            # Comandos para administradores
│   │   ├── member/           # Comandos para membros comuns
│   │   └── owner/            # Comandos para donos do bot/grupo
│   ├── config/               # Configurações do sistema
│   ├── database/             # Módulos de banco de dados
│   ├── errors/               # Classes de erro personalizadas
│   ├── middlewares/          # Middlewares de processamento
│   ├── services/             # Serviços externos e integrações
│   ├── types/                # Definições de tipos
│   │   ├── baileys.d.ts      # Tipos para a biblioteca Baileys
│   │   ├── commands.d.ts     # Tipos para comandos
│   │   ├── global.d.ts       # Declarações globais
│   │   └── utils.d.ts        # Tipos para utilitários
│   ├── utils/                # Funções utilitárias
│   ├── connection.ts         # Gerenciamento de conexão
│   ├── loader.ts             # Carregador de comandos e eventos
│   └── index.ts              # Ponto de entrada da aplicação
├── assets/                   # Recursos estáticos
│   ├── auth/                 # Dados de autenticação
│   └── images/               # Imagens utilizadas pelo bot
├── docs/                     # Documentação do projeto
├── tests/                    # Testes automatizados
├── .env                      # Variáveis de ambiente
├── .gitignore                # Arquivos ignorados pelo git
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração do TypeScript
└── README.md                 # Documentação principal
```

## Convenções de Nomenclatura

### Arquivos

- **Arquivos TypeScript**: Utilizar extensão `.ts`
- **Arquivos de definição de tipos**: Utilizar extensão `.d.ts`
- **Arquivos de teste**: Utilizar sufixo `.test.ts` ou `.spec.ts`
- **Nomes de arquivos**: Utilizar camelCase para todos os arquivos
  - Exceção: Arquivos de componentes ou classes podem usar PascalCase
  - Exemplo: `messageHandler.ts`, `DatabaseService.ts`

### Variáveis e Funções

- **Variáveis e funções**: Utilizar camelCase
  - Exemplo: `getUserMessage()`, `sendWhatsAppMessage()`
- **Classes e tipos**: Utilizar PascalCase
  - Exemplo: `class MessageHandler`, `interface CommandOptions`
- **Constantes**: Utilizar UPPER_SNAKE_CASE
  - Exemplo: `const MAX_RETRY_ATTEMPTS = 3`
- **Interfaces**: Prefixo "I" opcional, seguido de PascalCase
  - Exemplo: `interface ICommand` ou `interface Command`
- **Tipos**: Utilizar PascalCase
  - Exemplo: `type MessageType = 'text' | 'image'`

## Padrões de Codificação

### Geral

- Usar 2 espaços para indentação
- Usar ponto e vírgula no final das declarações
- Preferir aspas simples para strings
- Utilizar templates string para concatenação
- Adicionar uma linha em branco no final de cada arquivo

### TypeScript

- Sempre especificar tipos explicitamente em APIs públicas
- Permitir inferência de tipos em variáveis locais quando óbvio
- Utilizar `interface` para definições de API e `type` para unions e types mais complexos
- Preferir `readonly` para arrays e propriedades que não devem ser modificadas
- Evitar o uso de `any`, preferindo `unknown` quando necessário
- Utilizar genéricos para funções e métodos reutilizáveis

### Comentários e Documentação

- Usar comentários JSDoc para documentar funções, classes e interfaces públicas
- Manter comentários atualizados quando o código muda
- Comentar apenas o que não é óbvio no código
- Usar `// TODO:` para marcar tarefas pendentes

```typescript
/**
 * Envia uma mensagem para um grupo ou usuário
 * 
 * @param socket - Socket do WhatsApp
 * @param jid - ID do usuário ou grupo
 * @param message - Conteúdo da mensagem
 * @param options - Opções adicionais
 * @returns Promise que resolve quando a mensagem é enviada
 */
async function sendMessage(
  socket: WASocket,
  jid: string,
  message: string,
  options?: MessageOptions
): Promise<MessageResponse> {
  // Implementação
}
```

## Fluxo de Trabalho de Desenvolvimento

### Branches

- **main**: Branch principal, sempre em estado implantável
- **develop**: Branch de desenvolvimento
- **feature/[nome]**: Branches para novas funcionalidades
- **fix/[nome]**: Branches para correções de bugs
- **refactor/[nome]**: Branches para refatorações
- **docs/[nome]**: Branches para documentação

### Commits

Utilizar commits semânticos para facilitar a compreensão das alterações:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Alterações que não afetam o código (espaços, formatação)
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Alterações em ferramentas de build, configurações

Exemplos:
```
feat: adiciona sistema de menus interativos
fix: corrige erro na verificação de permissões
refactor: melhora tipagem do sistema de comandos
```

## Processo de Build e Deploy

### Scripts de Desenvolvimento

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  }
}
```

### Processo de Build

1. Executar linting e formatação: `npm run lint && npm run format`
2. Executar testes: `npm test`
3. Compilar código TypeScript: `npm run build`
4. Verificar se a build está funcionando: `npm start`

### Processo de Deploy

1. Mesclar branch de feature/fix em develop após revisão
2. Executar testes em ambiente de staging
3. Mesclar develop em main quando estável
4. Criar tag de versão seguindo SemVer (vX.Y.Z)
5. Deploy em ambiente de produção

## Organização de Testes

### Estrutura de Testes

```
tests/
├── unit/                 # Testes unitários
│   ├── utils/            # Testes de utilitários
│   ├── commands/         # Testes de comandos
│   └── ...
├── integration/          # Testes de integração
│   ├── api/              # Testes de APIs externas
│   └── ...
└── mocks/                # Mocks para testes
    ├── socket.ts         # Mock do socket WhatsApp
    └── ...
```

### Padrões de Teste

- Cada unidade de código deve ter testes correspondentes
- Testes unitários devem ser independentes (sem dependências externas)
- Utilizar mocks para simular componentes externos
- Nomear testes de forma descritiva usando "should"
- Organizar testes em describe/it para melhor legibilidade

```typescript
describe('MessageHandler', () => {
  describe('processCommand', () => {
    it('should execute the correct command when valid', () => {
      // Teste aqui
    });
    
    it('should return error when command not found', () => {
      // Teste aqui
    });
  });
});
```

## Ferramentas e Ambiente de Desenvolvimento

### Ferramentas Recomendadas

- **Editor**: Visual Studio Code
- **Plugins VSCode**:
  - ESLint
  - Prettier
  - TypeScript Hero
  - Jest Runner
- **Linting**: ESLint com configuração para TypeScript
- **Formatação**: Prettier
- **Testes**: Jest
- **Documentação**: TypeDoc

### Configuração de Ambiente

- Node.js v16+ recomendado
- npm ou yarn para gerenciamento de pacotes
- Configuração de EditorConfig para consistência entre editores

## Revisão de Código

### Processo

1. O autor cria um Pull Request (PR)
2. PR é revisado por pelo menos um desenvolvedor
3. Feedbacks são endereçados pelo autor
4. PR é aprovado quando todos os critérios forem atendidos
5. PR é mesclado à branch de destino

### Critérios de Aceitação

- Código segue as convenções e padrões estabelecidos
- Testes passam (unitários e integração)
- Documentação atualizada (quando necessário)
- Sem problemas de lint ou formatação
- Funcionalidade atende aos requisitos especificados 