import dotenv from 'dotenv';
dotenv.config();

import { Client  } from 'pg'

const client = new Client ({
  user: process.env.POSTGRES_USER || 'facilita-juridico',
  host: process.env.POSTGRES_HOST || 'localhost',
  password: process.env.POSTGRES_PASSWORD || 'admin12345',
  port: parseInt(process.env.POSTGRES_PORT || '5432')
})

export default client