import db from ".."
import { UserType } from "../../models/UserModel"

const userOperations = {
    getAll: (): Promise<UserType[]> => 
        db.query('SELECT * FROM users WHERE email <> $1', ['facilita@gmail.com']),
    getByMultipleIds: (ids: number[]): Promise<UserType[]> => 
        db.query('SELECT * FROM users WHERE id = ANY($1)',[ids])
        ,
    getUniqueById: (id: number): Promise<UserType[]> => 
        db.query('SELECT * FROM users WHERE id = $1', [id]),
    getUniqueByEmail: (email: string): Promise<UserType[]> => 
        db.query('SELECT * FROM users WHERE email = $1', [email]),
    create: (name:string, email:string, telphone:string, coordinates:number[]): Promise<UserType[]> => 
        db.query('INSERT INTO users (name, email, telphone, coordinates) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, telphone, coordinates]),
    update: (id: number, name:string, email:string, telphone:string, coordinates:number[]): Promise<UserType[]> => 
        db.query('UPDATE users SET name = $1, email = $2, telphone = $3, coordinates = $4 WHERE id = $5 RETURNING *', [name, email, telphone, coordinates, id]),
    delete: (id: number): Promise<UserType[]> => 
        db.query('DELETE FROM users WHERE id = $1', [id])
}

export default userOperations