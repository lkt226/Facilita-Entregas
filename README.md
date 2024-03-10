# facilita juridico test
 Teste para vaga de emprego da "Facilita Juridico"

## Video de apresentação
[https://www.youtube.com/watch?v=Vo8FAw83RUU](https://www.youtube.com/watch?v=Vo8FAw83RUU)

## Tecnologias

* Node.js: 21.7.1
* NPM: 10.5.0
* React: 18
* Next.js: 14.1.3 
* Docker: 25.0.3
* Postgres: 10.3

## Instalação
 Estou usando o (NPM) como referência mas poderia ser o Yarn, Pnpm ou Bun.
 * A nível de curiosidade eu usei o Pnpm, recomendo iniciar na ordem abaixo.

1. Postgres
    * cd backend
    * docker*compose up
    * vai iniciar no http://localhost:5432

2. Backend
    * cd backend
    * npm run install
    * npm run start
    * vai iniciar no http://localhost:5000

3. front-end:
    * cd frontend
    * npm run install
    * npm run dev
    * vai iniciar no http://localhost:3000

## DLL
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telphone VARCHAR(20) NOT NULL,
    coordinates DOUBLE PRECISION[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Escolha de técnologia.
 
 ### Utilizei para o front-end React, Next.js, TailwindCSS, Scss, ShadCN/UI, Leaflet, Redux e Ludice Icons.
* React: foi a tecnologia pedida nas instruções para o front-end.
* Next.js: foi usado para agilizar o processo de desenvolvimento, mas ele tambem seria útil se fosse um projeto real para poder usar o SSR nas listas por exemplo.
* TailwindCSS: eu adiciono como Core em praticamente todo projeto, ele facilita muito a parte de "design".
* Scss: eu adicionei o final do projeto para facilitar a leitura do CSS na parte de responsividade.
* ShadCN/UI: ele ta aqui para "suprir" a falta de um bootstrap, como não recebemos um "design" no figma para evitar ter que desenhar uma pagina resolvi usar uma biblioteca de UI.
* Leaflet: esse é só detalhe, como a aplicação é um serviço de entrega, achei que seria legal ter um mapa então coloquei o leaflet e as marcações no mapa baseado no plano cartesiano que faz parte do teste.
* Redux: adicionado para gerenciar as listas, mas o principal motivo é por ter uma parte de filtragem que fica em componentes separados para não ficar passando prop entre componente adicionei um gerenciador de estado (ia adicionar o Zustand, mas pensei que talvez vocês usassem o Redux).

 ### Para o backend foi usado Node.js, Express e o Jest.
* Node.js: foi a tecnologia pedida nas instruções para o backend.
* Express: foi usado por ser o framework mais simples que conheço e fora o único CRUD, só tem 1 rota.
* Jest + Supertest: foi usado para "test", mas não foi tão usado quanto deveria.

 ### E para o banco de dados foi usado o Postgres e Docker. 
* Postgres: foi a tecnologia pedida nas instruções para o banco de dados.
* Docker: foi utilizado porque acho mais fácil de instalar o Postgres no docker que configurar na maquina (caso dê tempo vou "dockerizar" o front-end e o backend tambem).

## Possiveis Melhorias
* Adicionar um storybook para fazer a documentação do frontend.
* Adicionar o swagger para fazer a documentação do backend.
* Adicionar uma funcionalidade para marcar o ponto pelo mapa e não usando X e Y.
* Modificar o mapa falso para os pontos ficarem mais perto uns dos outros.
* Adicionar mascaras nos campos de telefone
* Permitir numeros quebrados para o X e Y.
* Teria usado o Prisma no Backend mas tava proibido nas regras.