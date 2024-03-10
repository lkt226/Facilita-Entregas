import { usersModel } from '../models/UserModel'
import userOperation from './operations/user'
import { createDatabase } from '../database'
import databaseOperations from './operations'

const createUserTable = async () => {
    try {
        const usersTable = await databaseOperations.showUsersTable();

        if (usersTable.length === 0) {
            await databaseOperations.createUsersTable();
        }
    } catch (error) {
        console.error(error)
    }

    usersModel.forEach(async (user) => {
        try {
            const userExist = await userOperation.getUniqueByEmail(user.email)
            if(userExist.length === 0) {
                userOperation.create(user.name, user.email, user.telphone, user.coordinates)
            }
        } catch (error) {
                console.error(error)
        }
    })
}

const populate = async () => {
    await createDatabase(process.env.POSTGRES_DATABASE || 'mydb')
    
    // Adiciona os usuários padrão (atualmente só a empresa)
    createUserTable()
}

export default populate