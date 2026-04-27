# Gerenciador de Personagens Mausritter

> **Créditos**: Este projeto é uma tradução/adaptação do projeto original [mausritter-character-manager](https://github.com/chippolot/mausritter-character-manager) criado por [chippolot](https://github.com/chippolot). Todo o crédito pelo desenvolvimento vai ao autor original.

Um gerenciador de personagens moderno e interativo para o RPG de mesa Mausritter, construído com React e TypeScript.

## Experimente!

[Experimente o gerenciador de personagens aqui](https://matheus-cabral.github.io/gerenciador-de-personagem-mausritter/)

## Funcionalidades

- **Gerenciamento de Personagens**: Crie, edite e gerencie múltiplos personagens
- **Geração Aleatória de Personagens**: Assistente passo a passo seguindo as regras oficiais do Mausritter
- **Sistema de Inventário Tátil**: Inventário baseado em grid com arrastar-e-soltar e múltiplos tamanhos de itens (1x1, 2x1, 1x2, 2x2)
- **Detalhes Completos do Personagem**: Acompanhe status, antecedentes, aparência, equipamento e contratados
- **Status do Personagem**: Marque personagens como vivos/mortos com indicadores visuais
- **Armazenamento Persistente**: Personagens salvos automaticamente no armazenamento local

## Começando

### Pré-requisitos

- Node.js (versão 20.19+ ou 22.12+)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Matheus-Cabral/gerenciador-de-personagem-mausritter.git
   cd gerenciador-de-personagem-mausritter
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra seu navegador e acesse `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Deploy para GitHub Pages

1. **Importante**: Antes de fazer o deploy, atualize o caminho base no arquivo `vite.config.ts` para corresponder ao nome do seu repositório:

   ```typescript
   // vite.config.ts
   export default defineConfig(({ command }) => ({
     plugins: [react()],
     base: command === 'build' ? '/nome-do-seu-repositorio/' : '/',
   }))
   ```

   Substitua `/nome-do-seu-repositorio/` pelo nome exato do seu repositório GitHub.

2. Execute o deploy:
   ```bash
   npm run deploy
   ```

   Este comando irá:
   - Criar o build de produção
   - Publicar automaticamente no GitHub Pages via pacote `gh-pages`

3. **Configuração no GitHub** (se necessário):
   - Acesse: `https://github.com/seu-usuario/seu-repositorio/settings/pages`
   - Em **Source**, selecione **Deploy from a branch**
   - Em **Branch**, selecione **gh-pages** e **/(root)**
   - Clique em **Save**

4. Sua aplicação estará disponível em: `https://seu-usuario.github.io/nome-do-seu-repositorio/`

## Uso

1. **Criar Personagens**: Use o botão "Generate Random Character" para geração seguindo as regras, ou "Create Blank Character" para configuração manual
2. **Gerenciamento de Inventário**: Arraste itens entre slots do inventário, área de rascunho e equipamento do personagem
3. **Detalhes do Personagem**: Edite todas as informações do personagem diretamente na interface
4. **Múltiplos Personagens**: Alterne entre personagens usando o seletor de personagens

## Stack Tecnológico

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **@dnd-kit** - Funcionalidade de arrastar e soltar

## Legal

Este trabalho é baseado em [Mausritter](https://mausritter.com), um produto de Losing Games e Isaac Williams, e é licenciado para uso sob a licença [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
Este projeto não é afiliado ou endossado por Losing Games.
Compatível com Mausritter.
