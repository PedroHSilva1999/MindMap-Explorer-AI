# Spring Annotations Interactive Map

Atlas interativo e visual das anotações do Spring Framework, combinando visualização hierárquica em árvore com insights técnicos gerados por inteligência artificial.

## Preview

<img width="1899" height="646" alt="image" src="https://github.com/user-attachments/assets/2fce13c6-f841-4e5e-b1a8-6592d008fa22" />


## Visão Geral

Este projeto oferece uma experiência de aprendizado interativa para desenvolvedores que desejam explorar e compreender as anotações do Spring Framework. A aplicação apresenta um mapa mental navegável que organiza as anotações em categorias hierárquicas, permitindo busca rápida e acesso a explicações detalhadas geradas por IA.

## Características Principais

- **Mapa Mental Interativo**: Visualização hierárquica em árvore de todas as anotações do Spring Framework
- **Navegação Intuitiva**: Pan e zoom para explorar a estrutura completa
- **Busca Rápida**: Ferramenta de busca para localizar anotações específicas instantaneamente
- **Insights de IA**: Explicações técnicas detalhadas, exemplos de código e casos de uso gerados pelo Google Gemini
- **Guia Interativo**: Documentação integrada sobre como utilizar a aplicação
- **Interface Moderna**: Design responsivo com tema escuro otimizado para experiência visual

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
│   ├── AnnotationDetails.tsx    # Painel lateral com detalhes da anotação
│   ├── Guide.tsx                 # Modal com guia de uso
│   ├── MindMap.tsx               # Componente principal do mapa mental
│   └── Search.tsx                # Modal de busca de anotações
├── services/
│   └── geminiService.ts          # Serviço de integração com Google Gemini
├── constants.ts                  # Dados hierárquicos das anotações
├── types.ts                      # Definições de tipos TypeScript
├── App.tsx                       # Componente raiz da aplicação
└── vite.config.ts                # Configuração do Vite
```

## Como Usar

### Navegação no Mapa Mental

- **Arrastar**: Clique e arraste para mover o mapa
- **Zoom**: Use o scroll do mouse ou gesto de pinça no trackpad para aproximar ou afastar
- **Clique em Nós**: Clique em qualquer nó (categoria ou anotação) para visualizar detalhes técnicos

### Busca de Anotações

1. Clique no botão "Buscar" no cabeçalho
2. Digite o nome da anotação que deseja encontrar
3. Selecione o resultado da busca para visualizar os detalhes

### Visualização de Detalhes

Ao clicar em qualquer nó, um painel lateral será exibido com:
- **Descrição**: Resumo técnico sobre o conceito ou anotação
- **Caso de Uso Principal**: Exemplos práticos de aplicação
- **Implementação do Código**: Exemplos de código Java formatados
- **Dicas de Especialista**: Melhores práticas e recomendações

## Configuração da API

A aplicação utiliza a API do Google Gemini para gerar conteúdo técnico. Para obter sua chave de API:

1. Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma nova chave de API
3. Adicione a chave no arquivo `.env` como `GEMINI_API_KEY`

## Anotações Incluídas

O projeto mapeia as principais categorias e anotações do Spring Framework:

- **Boot**: Anotações específicas do Spring Boot
- **Stereotype**: Anotações de estereótipo (@Component, @Service, etc.)
- **Core/Beans**: Gerenciamento de beans e injeção de dependência
- **Core/Context**: Configuração do contexto da aplicação
- **Web**: Anotações para desenvolvimento de APIs REST

 
