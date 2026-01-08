# IA Explorer - Gerador Universal de Mapas Mentais

Aplicação web moderna que gera mapas mentais interativos para qualquer tecnologia ou conceito usando inteligência artificial. Explore, aprenda e visualize estruturas hierárquicas de conhecimento de forma intuitiva e visual.

## Preview

<img width="1899" height="646" alt="image" src="https://github.com/user-attachments/assets/2fce13c6-f841-4e5e-b1a8-6592d008fa22" />


## Visão Geral

IA Explorer é uma plataforma de aprendizado interativa que permite explorar qualquer tecnologia, framework ou conceito através de mapas mentais gerados por inteligência artificial. A aplicação combina uma interface moderna estilo Google com visualizações hierárquicas interativas, permitindo que desenvolvedores e estudantes explorem estruturas complexas de conhecimento de forma intuitiva.

O projeto vem pré-configurado com um mapa mental completo do Spring Framework, mas pode gerar mapas mentais dinâmicos para qualquer tecnologia que você pesquisar.

## Características Principais

- **Tela Home com Pesquisa Estilo Google**: Interface limpa e intuitiva com barra de pesquisa central para iniciar novas explorações.
- **Organização por Pastas/Categorias**: Tópicos são automaticamente organizados em categorias (ex: "Tópicos Java", "Pesquisas Recentes") para fácil navegação.
- **Gerador Universal de Mapas Mentais**: Use a IA para gerar mapas mentais de qualquer tecnologia ou conceito do zero em segundos.
- **Múltiplos Tópicos em Memória**: Mantenha vários mapas mentais abertos simultaneamente e navegue entre eles facilmente.
- **Insights de IA Dinâmicos**: Explicações técnicas detalhadas, exemplos de código e casos de uso gerados em tempo real pelo Google Gemini para qualquer nó selecionado.
- **Mapa Mental Interativo**: Visualização hierárquica em árvore com D3.js, suportando pan e zoom.
- **Busca Rápida**: Ferramenta de busca para localizar termos específicos dentro do mapa atual.
- **Spring Framework Pré-configurado**: Vem com um mapa mental completo do Spring Framework já pronto para explorar.
- **Interface Moderna**: Design responsivo com tema escuro otimizado e animações fluidas.

## Tecnologias Utilizadas

- **React 19**: Framework JavaScript para construção da interface
- **TypeScript**: Tipagem estática para maior robustez do código
- **D3.js**: Biblioteca para visualização de dados e criação do mapa mental
- **Vite**: Build tool e servidor de desenvolvimento de alta performance
- **Tailwind CSS**: Framework CSS utilitário para estilização
- **Google Gemini AI**: API de inteligência artificial para geração de conteúdo técnico
- **Lucide React**: Biblioteca de ícones moderna e leve

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Chave de API do Google Gemini

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd spring-annotations-interactive-map
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a chave de API do Google Gemini criando um arquivo `.env` na raiz do projeto:
```
GEMINI_API_KEY=sua-chave-api-aqui
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:4000`

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a versão de produção otimizada
- `npm run preview`: Visualiza a build de produção localmente

## Estrutura do Projeto

```
spring-annotations-interactive-map/
├── components/
│   ├── AnnotationDetails.tsx    # Painel lateral com detalhes de nós
│   ├── Guide.tsx                 # Modal com guia de uso
│   ├── Home.tsx                  # Tela inicial com pesquisa estilo Google
│   ├── MindMap.tsx               # Componente principal do mapa mental (D3.js)
│   └── Search.tsx                # Modal de busca dentro do mapa
├── services/
│   └── geminiService.ts          # Serviço de integração com Google Gemini AI
├── constants.ts                  # Dados hierárquicos do Spring Framework (pré-configurado)
├── types.ts                      # Definições de tipos TypeScript
├── App.tsx                       # Componente raiz com gerenciamento de tópicos
└── vite.config.ts                # Configuração do Vite
```

## Como Usar

### Tela Inicial (Home)

Ao iniciar a aplicação, você verá a tela Home com uma barra de pesquisa central:

1. **Pesquisar Nova Tecnologia**: Digite o nome de qualquer tecnologia, framework ou conceito (ex: "Docker", "React Hooks", "Python Flask") e clique em "Explorar" ou pressione Enter.
2. **Selecionar Tópico Existente**: Na parte inferior, você verá os tópicos organizados por categorias (pastas). Clique em qualquer tópico para abrir seu mapa mental.
3. **Navegação por Pastas**: Os tópicos são automaticamente organizados em categorias como "Tópicos Java" (Spring Framework pré-configurado) e "Pesquisas Recentes" (novos tópicos pesquisados).

### Navegação no Mapa Mental

- **Arrastar**: Clique e arraste para mover o mapa
- **Zoom**: Use o scroll do mouse ou gesto de pinça no trackpad para aproximar ou afastar
- **Clique em Nós**: Clique em qualquer nó (categoria ou item) para visualizar detalhes técnicos gerados por IA
- **Voltar ao Início**: Use o botão "Voltar ao Início" no cabeçalho para retornar à tela Home

### Busca Dentro do Mapa

1. Clique no botão "Buscar no Mapa" no cabeçalho
2. Digite o nome do item que deseja encontrar dentro do mapa atual
3. Selecione o resultado da busca para visualizar os detalhes

### Visualização de Detalhes

Ao clicar em qualquer nó do mapa mental, um painel lateral será exibido com:
- **Descrição**: Resumo técnico sobre o conceito ou tecnologia
- **Caso de Uso Principal**: Exemplos práticos de aplicação
- **Implementação do Código**: Exemplos de código formatados (Java, Dockerfile, JavaScript, etc., dependendo do contexto)
- **Dicas de Especialista**: Melhores práticas e recomendações profissionais

### Gerenciamento de Tópicos

- **Múltiplos Tópicos**: Você pode pesquisar vários tópicos e todos ficarão salvos na tela Home (em memória durante a sessão)
- **Organização Automática**: Novos tópicos são automaticamente adicionados à pasta "Pesquisas Recentes"
- **Spring Framework**: O mapa mental do Spring Framework já vem pré-configurado na pasta "Tópicos Java"

## Configuração da API

A aplicação utiliza a API do Google Gemini para gerar conteúdo técnico. Para obter sua chave de API:

1. Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova chave de API
3. Adicione a chave no arquivo `.env` como `GEMINI_API_KEY`

## Tópicos Pré-configurados

O projeto vem com o Spring Framework já configurado como exemplo, incluindo:

- **Boot**: Anotações específicas do Spring Boot
- **Stereotype**: Anotações de estereótipo (@Component, @Service, etc.)
- **Core/Beans**: Gerenciamento de beans e injeção de dependência
- **Core/Context**: Configuração do contexto da aplicação
- **Web**: Anotações para desenvolvimento de APIs REST

 
