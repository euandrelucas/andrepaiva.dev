# Começando com o Portfólio Pessoal em React

Este projeto é um portfólio pessoal desenvolvido em React, destinado a apresentar suas informações do GitHub e destacar seus projetos de maneira organizada. O site inclui seções para suas informações de perfil, uma breve apresentação, projetos em destaque e detalhes de contato.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Inicia o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

A página será recarregada quando você fizer alterações.\
Você também poderá ver quaisquer erros de lint no console.

### `npm test`

Inicia o executor de testes no modo de observação interativa.\
Consulte a seção sobre [execução de testes](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa o React corretamente no modo de produção e otimiza a compilação para obter o melhor desempenho.

A compilação é minificada, e os nomes dos arquivos incluem hashes.\
Seu aplicativo está pronto para ser implantado!

Consulte a seção sobre [implantação](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

### `npm run eject`

**Nota: esta é uma operação unidirecional. Depois de fazer `eject`, você não pode voltar atrás!**

Se você não estiver satisfeito com a ferramenta de construção e as opções de configuração, pode fazer `eject` a qualquer momento. Este comando removerá a única dependência de compilação do seu projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (Webpack, Babel, ESLint, etc.) diretamente para o seu projeto, para que você tenha controle total sobre eles. Todos os comandos, exceto `eject`, ainda funcionarão, mas apontarão para os scripts copiados para que você possa ajustá-los. Neste ponto, você está por conta própria.

### `npm run prod`

Executa o aplicativo em modo de produção usando o servidor [serve](https://www.npmjs.com/package/serve) com Jemalloc.\
O servidor será iniciado em [http://localhost:4568](http://localhost:4568).

## A Estrutura do Projeto

Os principais componentes do seu projeto incluem:

- `ProfileSection`: Exibe sua foto de perfil do GitHub, nome de usuário, descrição e links de navegação.

- `Home`: O principal componente que busca dados na API do GitHub, exibe suas informações de perfil, projetos em destaque e detalhes de contato.

## Infraestrutura do Projeto e Dockerfile

Este projeto utiliza um Dockerfile para facilitar a implantação e a execução consistente em diferentes ambientes. Aqui está o conteúdo do Dockerfile:

```dockerfile
FROM node:20

# Cria o diretório APP
WORKDIR /usr/src/app

# Instala o Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Instala as dependências do aplicativo
COPY package*.json ./
RUN npm install

# Agrupa o código-fonte do aplicativo
COPY . .

# Compila o aplicativo React
RUN npm run build

# Instala o serve
RUN npm install -g serve

# Expõe a porta 4568
EXPOSE 4568

# Inicia o aplicativo
CMD ["npm", "run", "prod"]
```

Este Dockerfile realiza as seguintes etapas:

1. Usa a imagem `node:20` como base.
2. Configura o diretório de trabalho para `/usr/src/app`.
3. Instala o Jemalloc para melhor gerenciamento de memória.
4. Copia os arquivos `package.json` e `package-lock.json` e instala as dependências.
5. Copia o restante dos arquivos do aplicativo.
6. Compila o aplicativo React usando `npm run build`.
7. Instala o servidor `serve`.
8. Expõe a porta 4568.
9. Inicia o aplicativo em modo de produção usando o comando `npm run prod`.

O Dockerfile simplifica a criação de uma imagem Docker para o seu aplicativo, garantindo uma execução consistente em diferentes ambientes. Para implantar o aplicativo usando Docker, você pode usar comandos como `docker build` e `docker run`. Certifique-se de ter o Docker instalado e configurado no ambiente de implantação.
