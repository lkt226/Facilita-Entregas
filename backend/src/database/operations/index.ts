import db from ".."

const databaseOperations = {
    showDatabases: () => 
        db.query('SELECT datname FROM pg_database'),
    createDatabase: (databaseName: string) => 
        db.query(`CREATE DATABASE ${databaseName}`),
    showUsersTable: () => 
        db.query("SELECT table_name FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public'"),
    // Se fosse realmente usar coordenadas deveria se usar o 'POINT' no lugar do 'DOUBLE PRECISION'
    createUsersTable: () => db.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            telphone VARCHAR(20) NOT NULL,
            coordinates DOUBLE PRECISION[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `),
}

export default databaseOperations