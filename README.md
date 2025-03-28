# <img src="https://i.pinimg.com/736x/1f/13/d6/1f13d608b1793fd497f663f75ff8e3ad.jpg" width="30"> NeroBot - Bot de WhatsApp em TypeScript

<div align="center">
  
  ![Banner](https://i.pinimg.com/736x/1f/13/d6/1f13d608b1793fd497f663f75ff8e3ad.jpg)

  <h3>Bot de WhatsApp com recursos avançados baseado na biblioteca Baileys</h3>

  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://www.whatsapp.com/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
  [![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)]()
  
</div>

## ✨ Recursos

<div align="center">
  <table>
    <tr>
      <td>
        <h3>💻 Comandos Modulares</h3>
        Organizados por categorias com sistema<br>de permissões integrado
      </td>
      <td>
        <h3>🖼️ Mídia</h3>
        Gerenciamento inteligente de<br>stickers, imagens e vídeos
      </td>
      <td>
        <h3>🔒 Segurança</h3>
        Sistema anti-link e<br>controle de grupos
      </td>
    </tr>
    <tr>
      <td>
        <h3>🤖 IA</h3>
        Recursos avançados de<br>inteligência artificial
      </td>
      <td>
        <h3>🎵 Música</h3>
        Pesquisa e envio de<br>músicas e vídeos
      </td>
      <td>
        <h3>🔧 Extensível</h3>
        Fácil de expandir com<br>novos comandos
      </td>
    </tr>
  </table>
</div>

## 📊 Melhorias com TypeScript

<div align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*5H2RHrqmBs5EwtPLdTOGPQ.png" width="90%">
  
  <table>
    <tr>
      <th>Métrica</th>
      <th>JavaScript</th>
      <th>TypeScript</th>
      <th>Melhoria</th>
    </tr>
    <tr>
      <td>Detecção de Erros</td>
      <td>Em Runtime</td>
      <td>Em Compilação</td>
      <td>+90%</td>
    </tr>
    <tr>
      <td>Manutenibilidade</td>
      <td>Média</td>
      <td>Alta</td>
      <td>+75%</td>
    </tr>
    <tr>
      <td>Auto-completação</td>
      <td>Limitada</td>
      <td>Avançada</td>
      <td>+85%</td>
    </tr>
    <tr>
      <td>Robustez</td>
      <td>Média</td>
      <td>Alta</td>
      <td>+80%</td>
    </tr>
  </table>
</div>

## 🚀 Começando

### Pré-requisitos

<div align="center">
  <img src="https://i.pinimg.com/originals/6e/3c/da/6e3cdaea0b669812cf68210f62bb0638.png" width="150px" align="right">
</div>

- Node.js v16+
- npm ou yarn
- Uma conta de WhatsApp para o bot

### Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/AnthonyVeras/NeroBot.git
cd NeroBot

# Instale as dependências
npm install

# Configure o ambiente
# Crie um arquivo .env baseado no .env.example
cp .env.example .env

# Inicie em modo de desenvolvimento
npm run dev
```

## 🏗️ Estrutura do Projeto

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

## 💻 Comandos Disponíveis

<div align="center">
  <table>
    <tr>
      <td><code>npm run dev</code></td>
      <td>Inicia o bot em modo de desenvolvimento</td>
    </tr>
    <tr>
      <td><code>npm run build</code></td>
      <td>Compila o TypeScript para JavaScript</td>
    </tr>
    <tr>
      <td><code>npm start</code></td>
      <td>Inicia o bot em modo de produção</td>
    </tr>
    <tr>
      <td><code>npm run watch</code></td>
      <td>Inicia o bot com hot reload</td>
    </tr>
  </table>
</div>

## 🧩 Desenvolvimento

Criar novos comandos é simples! Adicione-os nas pastas correspondentes em `src/commands/`:

```typescript
// Exemplo de comando simples
export const commands = ["ping", "p"];
export const name = "ping";
export const description = "Verifica se o bot está online";

export const handle = async ({ sendText }: CommonFunctions): Promise<void> => {
  await sendText("Pong! 🏓");
};
```

## 📚 Documentação

<div align="center">
  <a href="docs/guide.md">
    <img src="https://img.shields.io/badge/Guia%20do%20Desenvolvedor-0A0A0A?style=for-the-badge&logo=readme&logoColor=white" alt="Guia">
  </a>
  <a href="docs/contribution-guidelines.md">
    <img src="https://img.shields.io/badge/Como%20Contribuir-1F6FEB?style=for-the-badge&logo=github&logoColor=white" alt="Contribuir">
  </a>
  <a href="docs/roadmap.md">
    <img src="https://img.shields.io/badge/Roadmap-E44332?style=for-the-badge&logo=notion&logoColor=white" alt="Roadmap">
  </a>
</div>

## 📜 Licença

<div align="center">
  <img src="https://i.pinimg.com/originals/f6/c8/c6/f6c8c6958895b969e4f200554a1f3c7a.jpg" width="300px">
  
  Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
  
  <br>
  
  **Anthony** - [GitHub](https://github.com/AnthonyVeras)
  
  <br>
  
  <sub>Inspirado na personagem Nero/Secre Swallowtail de Black Clover</sub>
  
  <sub>Versão atualizada: Março 2024</sub>
</div>
