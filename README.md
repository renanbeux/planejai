# Planeja Aí (planejai) 🎯

Acesse ele funcionando aqui: 

## O que o projeto faz?
O **Planeja Aí** é um simulador financeiro inteligente. Ele ajuda você a se planejar para alcançar uma meta ou realizar um sonho (como uma viagem, comprar um carro, etc.). Você informa sua renda mensal, seus custos fixos, dívidas e o valor e prazo da sua meta. Com esses dados, o sistema calcula quanto você precisa economizar mensalmente e, utilizando Inteligência Artificial (Google Gemini), gera um insight financeiro personalizado com dicas de viabilidade, sugestões de economia extra e motivação.

## Como executar a aplicação
Siga o passo a passo abaixo para rodar o projeto na sua máquina:

1. **Pré-requisitos:** Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
2. **Clone e acesse o repositório:** Navegue até a pasta do projeto.
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Configuração de Variáveis de Ambiente:**
   Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a sua chave de API do Google Gemini:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_de_api_aqui
   ```
5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
6. **Acesse a aplicação:** Abra o navegador e acesse a URL informada no terminal (geralmente `http://localhost:5173`).

## Quais tecnologias foram usadas
- **React (com Vite):** Biblioteca principal para construção da interface de forma rápida.
- **TypeScript:** Adiciona tipagem estática ao JavaScript, garantindo maior segurança e menos bugs.
- **Tailwind CSS:** Framework de CSS utilitário para uma estilização rápida e responsiva.
- **React Router Dom:** Para o roteamento e navegação entre as páginas.
- **Lucide React:** Biblioteca de ícones modernos.
- **Google Gemini API (gemini-3.1-flash-lite):** Utilizada para gerar insights financeiros inteligentes e conversar com o usuário.

## Melhoria Implementada (Histórico e Chat)
Implementei duas grandes funcionalidades no projeto para melhorar a experiência do usuário:
- **Histórico de Simulações (`/historico`):** Todas as simulações que você realiza agora são salvas localmente e podem ser acessadas em uma página dedicada. Você pode visualizar simulações antigas, acompanhar o seu progresso e até mesmo excluir aquelas que não fazem mais sentido.
- **Chat de Dúvidas Financeiras (Assistente IA):** Na tela de resultados da simulação, foi adicionado um Chat integrado com o Google Gemini. O chat entende todo o contexto da sua simulação atual (sua renda, seus gastos, sua meta) e permite que você tire dúvidas sobre como alcançar seu objetivo mais rápido, onde investir seu dinheiro, e receba mentoria financeira personalizada.

## Como testar o fluxo principal
Para ver o sistema e as novas melhorias funcionando na prática, siga este fluxo:
1. **Página Inicial:** Na tela inicial (`/`), preencha o formulário com dados financeiros realistas (Renda, Custos, Dívidas).
2. **Defina a Meta:** Insira o nome do seu objetivo (ex: "Intercâmbio"), o valor e em quantos meses deseja realizar.
3. **Gere a Simulação:** Clique no botão "Gerar simulação ✨".
4. **Análise dos Resultados:** Você será redirecionado para a tela de resultados (`/resultado/:id`). Veja os cálculos de economia mensal e leia o **Insight Financeiro Personalizado** gerado pela IA.
5. **Teste o Chat:** Na seção do Insight, envie uma mensagem no Chat como: *"Onde posso cortar gastos para atingir a meta mais rápido?"* e aguarde a resposta personalizada da IA.
6. **Verifique o Histórico:** Acesse a rota de histórico (clicando no link de navegação ou indo em `/historico`) e certifique-se de que a sua simulação foi salva corretamente. Você pode apagar a simulação caso queira testar a funcionalidade de exclusão.

Acesse ele funcionando aqui: 