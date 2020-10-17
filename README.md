<h1 align="center">
    <img alt="GitVisualizer" title="titleImage" src=".github/logo.png" width="250px" />
</h1>

<h4 align="center">
  🚀 Github Visualizer
</h4>
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/danjosepad/github-visualizer">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/danjosepad/github-visualizer">
  
  <a href="https://github.com/danjosepad/github-visualizer/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/danjosepad/github-visualizer">
  </a>

  <a href="https://github.com/danjosepad/github-visualizer/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/danjosepad/github-visualizer">
  </a>

</p>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#como-usar">Como usar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#clipboard-documentação">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#uso-de-ferramentas-no-código">Ferramentas</a>
</p>

<br>

<p align="center">
  <img alt="appScreens" src=".github/appScreens.jpg" width="100%">
</p>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com:

- [React](https://reactjs.org)
- [Figma](https://www.figma.com/file/O8xkvke8TAMm24vxbhoecM/Github-Visualizer)

## 💻 Projeto

O Github Visualizer permite que você busque e gerencie novas organizações dentro do github, e interaja com elas visualizando e buscando por seus repositórios!

O motivo de escolher um gerenciamento de multiplas organizações, e listar e pesquisar novos repositórios surgiu mais como uma ideia de melhorar a visualização e facilitar a busca por organizações.

## Como Usar

[yarn]() para instalar dependencias.

[yarn start]() para iniciar.

[yarn cypress]() com o projeto iniciado para abrir o cypress para testes end-to-end.

Ou acesse o [link do netlify](https://wonderful-pike-87aad7.netlify.app/) (OBS: Recomendo utilizar o local caso queira alterar os links pelo própria URL, já que ao alterar para o link do repositório, o netlify reconhece como outro endereço e não acessará a paginação estruturada)

### Funcionalidades 

- Buscar e salvar organizações (Validação para busca)
- Excluir organizações
- Acessar dados da organização (Validação para link de URL)
- Visualizar repositórios
- Acessar repositório
- Buscar por mais repositórios
- Pesquisar por repositório (Validação para busca)
- Ao apagar pesquisa voltam a aparecer os repositórios de forma padrão

## :clipboard: Documentação

Aqui irei citar de forma geral as ferramentas utilizadas, e o motivo para o uso, dando um contexto geral no por quê de cada coisa:

- **Figma** - Antes de iniciar o projeto, queria ter certeza da imagem que eu queria passsar para o mesmo, e nada mais útil e eficaz do que usar o Figma para garantir a qualidade inicial. Através desse [Link](https://www.figma.com/file/O8xkvke8TAMm24vxbhoecM/Github-Visualizer?node-id=0%3A1) é possível visualizar um pouco do esqueleto feito antes de colocar a mão na massa e codar!

- **ReactJS** - Através dele é possível criarmos aplicações performáticas seguindo o conceito SPA e melhorar a estruturação através da bagagem nessa biblioteca.

## Uso de Ferramentas no código

- **Axios** - Através do Axios, pude consumir a API do Github sem precisar trabalhar de uma maneira "vanilla", mas que ainda garante performance e agilidade no processo.

- **Cypress** - Para garantir a qualidade do código e se está tudo funcionando conforme o planejado, estruturei testes end-to-end no projeto para garantir que tanto a API quanto o client estão se comunicando da maneira que deveriam.

- **Eslint** - Para garantir a qualidade do código, iniciei o projeto utilizando AirBnb;

- **Formik** - Mesmo que nesse momento pareça "matar uma formiga com uma bazooka", quis apresentar para mostrar como é fácil utilizar, e garantir que caso esse projeto tenha novas funcionalidades, será possível escalar de maneira fácil e com qualidade através dessa biblioteca. Junto a ela, utilizei também o Yup, para garantir de forma geral a estrutura que os dados virão.

- **Lottie** - O uso dessa biblioteca se deu por adicionar gifs em JSON, de uma forma que se apresente muito performática.

- **PropTypes** - para a tipagem das propriedades.

- **React-Helmet** - Pra dar um "charme" e gerenciar os titulos tanto do aplicativo principal quanto das organizações ao acessá-las, trazendo usabilidade e melhoria na experiência de usuário.

- **React Router Dom** - Para garantir a paginação e estruturação performática de um SPA.

- **React Icons** - Para garantir a qualidade na interface, optei pelo React Icons por trazer aquela "cara" mais profissional ao projeto.

- **Styled Components** - Através dessa biblioteca eu consigo garantir a qualidade da estilização usando Javascript, podendo gerenciar props, hierarquias e muito mais. Pra ajudar na estrutura, optei por uso de tipografia, breakpoints e cores na aba styles baseadas no material-ui para garantir a qualidade e escalabilidade do mesmo.

