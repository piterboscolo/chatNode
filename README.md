# chat-node

![chatnode](https://user-images.githubusercontent.com/88910148/158397928-e88dcacc-c0c4-4da1-9da0-ae686547f138.JPG)

Web chat utilizando Node.js. Com Node.js podemos usar JavaScript no lado servidor. A aplicação utiliza WebSockets (recurso do HTML5) com a biblioteca http://socket.io para implementar o chat.

Este projeto baseado no exemplo disponível no site do socket.io.

1. Estrutura do Projeto
server.js: representa a aplicação Node.js que permitirá aos clientes (por meio do navegador) interagirem no chat.

package.json: representa o arquivo de configuração da aplicação servidora. Ele foi criando por meio de um assistante, digitando-se npm init no terminal. As dependências (bibliotecas utilizadas pela aplicação) foram baixadas e salvas em tal arquivo digitando-se npm i express socket.io. No entanto, como o package.json já está configurado, não é preciso executar estes dois comandos.

index.html: página web que será disponibilizada aos clientes quando eles acessarem o servidor por meio do navegador. Tal página representa a parte cliente do chat. Por meio dela os usuários podem interagir entre si, utilizando o servidor como intermediário.

2. Instalação
O projeto usa o Node.js para rodar o servidor e o npm para gerenciar pacotes utilizados pela aplicação (como por exemplo, para baixar tais pacotes diretamente pelo terminal).

Opcionalmente, pode-se usar o nodemon para permitir monitorar alterações no código do servidor e reiniciá-lo automaticamente. Isto facilita muito o desenvolvimento pois não temos que parar o servidor manualmente cada vez que fizermos uma alteração no código.

2.1. Windows
Os comandos acima são para Linux e macOS. Se você usa Windows, pode baixar manualmente o Node.js que os comandos npm descritos anteriormente possivelmente vão funcionar sem precisar de configurações adicionais.

2.2. Dependências da aplicação servidora
Os pacotes (dependências) que são utilizados pela aplicação servidora são salvos na pasta node_modules. Esta pasta não é incluída e pode ser removida a qualquer momento (uma vez que podemos usar um comando para baixar os pacotes novamente). Assim, para baixar tais pacotes em tal pasta, basta executar make install.

3. Executando a Aplicação

3.1. Servidor
Para iniciar o servidor, podemos executar:

npm start
Porém, utilizando o nodemon, basta fazer nodemon que ele vai procurar um arquivo server.js e iniciá-lo automaticamente.

3.2. Cliente
Após iniciar o servidor, ele vai mostrar no terminal o endereço que a aplicação pode ser acessada pelo navegador (cliente). O endereço padrão é http://localhost:3000. Cada aba ou janela do navegador aberta em tal endereço representará um usuário do chat.

4. Aplicação Cliente sem o uso da biblioteca socket.io
A biblioteca socket.io facilita bastante a criação de aplicações clientes e servidoras que usem o protocolo WebSocket. No entanto, ao usar tal biblioteca, a interoperabilidade de tais aplicações é prejudicada. 

5. Hospedagem da Aplicação em Provedor de Nuvem
Para podermos testar a aplicação remotamente, ela foi hospedada no Heroku, um provedor de nuvem que fornece serviços que chamamos de Platform as a Service (PaaS). Tal provedor fornece gratuitamente uma plataforma para implantação (deploy) de aplicações, de modo que todo o processo de instalação das ferramentas necessárias para a execução da aplicação é automatizado e não temos que nos preocupar com nada disso. Isto inclui a instalação de:

ferramentas de execução (máquinas virtuais para Java, Node.js, Python, PHP, etc);

servidores web e de aplicação;

bibliotecas que tais aplicações utilizam.

O Heroku é um serviço por se integrar com o GitHub. Ele detecta quando enviamos alterações para um repositório no GitHub (com git push), baixa o código e implanta a aplicação. 

Como esta aplicação é desenvolvida utilizando Node.js, o Heroku identifica isso pela existência do arquivo package.json e assim criar todo um ambiente de execução de aplicações.

A aplicação está hospedada em
