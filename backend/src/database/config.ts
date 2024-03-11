import { Client  } from 'pg'

const client = new Client ({
  user: process.env.POSTGRES_USER || 'facilita-juridico',
  host: process.env.POSTGRES_HOST || 'localhost',
  password: process.env.POSTGRES_PASSWORD || 'admin12345',
  port: parseInt(process.env.POSTGRES_PORT || '5432')
})

// TESTE PARA VER O RESULTADO QUE DA NO RENDER ( NÃO ACHANDO O BANCO DE DADOS )
console.log({
  user: process.env.POSTGRES_USER || 'facilita-juridico',
  host: process.env.POSTGRES_HOST || 'localhost',
  password: process.env.POSTGRES_PASSWORD || 'admin12345',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE || 'mydb'
})

export default client