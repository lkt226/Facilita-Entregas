import client from "./config";
import databaseOperations from "./operations";

export const createDatabase = async (databaseName: string) => {
  client.connect()

  try {
      const databases = await databaseOperations.showDatabases();
      const databaseExists = databases.some(db => db.datname === databaseName);

      if (databaseExists) {
        console.log('O banco de dados já existe.');
      } else {
        await databaseOperations.createDatabase(databaseName);
        console.log(`Banco de dados ${databaseName} criado com sucesso.`);
      }
  } catch (error) {
      console.error('Erro ao criar o banco de dados:', error);
  }
}

const db = {
  ...client ,
  query: async (queryText: string, values?: any) => (await client.query(queryText, values)).rows
}

export default db