
# Documentação da Aplicação de API
 
## Visão Geral
 
Esta aplicação de API foi desenvolvida utilizando Node.js e PostgreSQL com Prisma. Ela segue uma arquitetura RESTful com modelos e controladores, aplicando princípios como Strategy e SOLID para garantir uma estrutura de código organizada e extensível. Além disso, foram incluídos testes unitários usando um runner de testes Node.js para garantir a qualidade do código.
 
## Tecnologias Utilizadas
 
-  **Node.js**: Ambiente de execução JavaScript server-side.
-  **Express.js**: Framework web para Node.js.
-  **Prisma**: ORM (Object-Relational Mapping) para Node.js e TypeScript.
-  **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
-  **Node test runner**: Framework de teste para JavaScript.
-  **Supertest**: Biblioteca para testes de API HTTP com Jest.
-  **Strategy Pattern**: Padrão de projeto para encapsular famílias de algoritmos e torná-los intercambiáveis.
-  **SOLID Principles**: Princípios de design de software para tornar o código mais fácil de entender, manter e estender.
 
## Arquitetura da Aplicação

A aplicação segue uma arquitetura baseada em modelos e controladores, onde os modelos representam as entidades de dados e os controladores contêm a lógica de negócios para manipular esses modelos. O Express.js é usado para lidar com as rotas e as requisições HTTP.
.
├── src # Pasta principal do código-fonte
│ ├── controllers # Controladores da API
│ ├── config # Configuração de banco de dados e outros
│ ├── routes # Definição das rotas da API
│ ├── middlewares # Middlewares de validações de rotas
│ └── server.js # Configuração e inicialização do Express.js
├── tests # Testes unitários
├── .env # Arquivo de variáveis de ambiente
├── .gitignore # Arquivo de configuração do Git
└── README.md # Documentação do projeto
 
## Testes Unitários
 
Foram implementados testes unitários para garantir a qualidade do código e a funcionalidade correta da API. O framework Jest foi utilizado para escrever e executar os testes, enquanto o Supertest foi utilizado para realizar testes de integração das rotas da API.

## Como Executar
 
Para executar a aplicação localmente, siga as instruções abaixo:
 
1. Instale as dependências do projeto:

```bash
npm  install
```
  3. Configure as variáveis de ambiente:
 
Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, como a string de conexão com o banco de dados.
 
4. Execute os testes unitários:
 
```bash
npm  test
```

5. Inicie o servidor:
 
```bash
npm  start
```
A aplicação estará disponível em `http://localhost:3000`.
 
## implementação do Docker e Kubernetes
 
O projeto foi configurado com Docker para facilitar a entrega e a execução em ambientes de desenvolvimento, teste e produção. O Dockerfile incluído no repositório permite a construção de uma imagem Docker para o aplicativo Vue.js, garantindo que as dependências sejam empacotadas junto com o aplicativo e possam ser executadas em qualquer ambiente compatível com o Docker.
 
Para executar o contêiner Docker localmente, você pode usar os seguintes comandos:
 
```bash
 
#docker para Postgres
docker-compose  -f  ./docker-postgres.yaml
 
# Usando docker run
docker  build  -t  api  .
docker  run  -p  5000:5000  front

# Usando docker-compose
docker-compose  up  -d --build

```
Além disso, foi implementado um manifesto do Kubernetes para facilitar a implantação do aplicativo em um cluster Kubernetes. O arquivo `deployment.yaml` contém as especificações de implantação do aplicativo, incluindo o número de réplicas, configurações de volume, configurações de serviço, etc.
 
```bash
kubectl  apply  -f  ./.k8s/deployment.yaml
```

O arquivo `deployment.yaml` contém as especificações de implantação do aplicativo, incluindo o número de réplicas, configurações de volume, configurações de serviço, etc.
 
Além do arquivo de implantação, também foi criado um arquivo de serviço (`service.yaml`) para expor o aplicativo para o tráfego externo. O arquivo de serviço define um serviço Kubernetes do tipo LoadBalancer para expor o aplicativo na porta 80.
 
Você pode implantar o serviço junto com o aplicativo usando o seguinte comando:
 
```bash
kubectl  apply  -f  service.yaml
```
 
O arquivo `service.yaml` contém as especificações do serviço Kubernetes, incluindo o tipo de serviço, porta de destino, portas expostas, etc.
 
## Implementação do CI/CD com GitHub Actions
 
Foi configurado um pipeline de CI/CD com GitHub Actions para automatizar o processo de construção, publicação e entrega da imagem do contêiner para o cluster Kubernetes. O pipeline é acionado automaticamente sempre que um novo código é enviado para o repositório no GitHub.
 
O pipeline consiste nas seguintes etapas:
 
1.  **Build do Aplicativo**: O código do aplicativo é clonado e uma nova imagem Docker é construída usando o Dockerfile fornecido no repositório.
 
2.  **Testes Automatizados**: O pipeline executa testes automatizados para garantir que o código esteja funcionando conforme o esperado.
 
3.  **Publicação da Imagem Docker**: Após a construção bem-sucedida, a imagem Docker é publicada em um registro de contêiner, como Docker Hub ou GitHub Container Registry.
 
4.  **Implantação no Kubernetes**: Finalmente, a nova versão da imagem do contêiner é implantada no cluster Kubernetes usando o manifesto de implantação e serviço fornecido no repositório.
 
Isso permite que o aplicativo seja atualizado de forma contínua e automatizada sempre que houver uma alteração no código-fonte, garantindo um processo de entrega rápido e confiável.