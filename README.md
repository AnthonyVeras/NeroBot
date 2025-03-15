# NeroBot - Bot de WhatsApp em TypeScript

Bot de WhatsApp com recursos avançados baseado na biblioteca Baileys, desenvolvido com TypeScript.

## Recursos

- Comandos modulares organizados por categorias (admin, member, owner)
- Sistema de permissões integrado para comandos
- Gerenciamento de stickers, imagens e vídeos
- Sistema anti-link e gerenciamento de grupos
- Recursos de IA
- Pesquisa de música/vídeos
- E muito mais...

## Requisitos

- Node.js v16+
- npm ou yarn
- Uma conta de WhatsApp para o bot

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nero-bot.git
   cd nero-bot
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` baseado no `.env.example`:
   ```
   PREFIX=!
   OWNER_NUMBER=5500000000000
   TEMP_DIR=./tmp
   ASSETS_DIR=./assets
   COMMANDS_DIR=./src/commands
   ```

4. Inicie o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

```
├── assets/           # Recursos estáticos
├── src/
│   ├── commands/     # Comandos organizados por categoria
│   │   ├── admin/    # Comandos para administradores
│   │   ├── member/   # Comandos para membros
│   │   └── owner/    # Comandos exclusivos para o dono do bot
│   ├── config/       # Configurações
│   ├── errors/       # Classes de erro personalizadas
│   ├── middlewares/  # Interceptadores de comandos
│   ├── services/     # Serviços externos (API, etc)
│   ├── types/        # Definições de tipos TypeScript
│   └── utils/        # Funções utilitárias
└── tmp/              # Arquivos temporários
```

## Comandos Disponíveis

- `npm run dev` - Inicia o bot em modo de desenvolvimento
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o bot em modo de produção
- `npm run watch` - Inicia o bot com hot reload

## Desenvolvimento

Para criar novos comandos, adicione-os nas pastas correspondentes em `src/commands/`:

```typescript
// Exemplo de comando simples
export const commands = ["ping", "p"];
export const name = "ping";
export const description = "Verifica se o bot está online";

export const handle = async ({ sendText }: CommonFunctions): Promise<void> => {
  await sendText("Pong! 🏓");
};
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Autor

Anthony - [GitHub](https://github.com/seu-usuario)
