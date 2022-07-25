
import IUserRepository from './user.repository.interface'
import IUser from '../../domain/models/user.model.interface';
import AppDataSource from '../../conf/dataSource';
import { UserEntity } from '../orm/schemas/user.schema'
import EmailAlreadyRegisteredException from './exceptions/exceptions'

export class UserSqlRepository implements IUserRepository {

    public async save(
        email: string,
        name: string,
        password: string,
        gamesPlayed: number,
        gamesWon: number
    ): Promise<IUser> {
        const repo = AppDataSource.getRepository(UserEntity);
        const newUser = {
            email, name, gamesPlayed, gamesWon, password, token: ''
        }
        try {
            const user = await repo.save(newUser)
            return user;
        } catch (err) {
            console.log(err);
            switch (err.code) {
                case 'SQLITE_CONSTRAINT':
                    throw new EmailAlreadyRegisteredException();
                default:
                    throw err;
            }
        }
    }

    public async update(user: IUser): Promise<IUser> {
        const repo = AppDataSource.getRepository(UserEntity);
        const userUpdated = await repo.update({id: user.id}, user);
        console.log("user updated: ", userUpdated);
        return user;
    }

    public async get(email: string): Promise<IUser | null> {
        const repo = AppDataSource.getRepository(UserEntity);
        const user = await repo.findOne({where: {email}});
        return user;
    }

}
