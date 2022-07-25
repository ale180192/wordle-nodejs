import {v4 as uuidv4} from 'uuid';

import { User } from '../../../domain/models/user.model'
import IUser from '../../../domain/models/user.model.interface';
import IUserRepository from '../../../adapters/repositories/user.repository.interface';

export default class UserRepositoryFake implements IUserRepository {
    users: User[] = [];
    lasId: string = "1";

    constructor() {
        console.log("Orm is not necesary.");
    }

    public async save(
        email: string,
        name: string,
        password: string,
        gamesPlayed: number,
        gamesWon: number
    ): Promise<IUser> {
        const user = new User(
            email, name, password, "", gamesPlayed, gamesWon,  this.lasId + 1
        )
        this.users.push(user);
        return user;
    }

    async update(user: IUser): Promise<IUser> {
        return new User(
            "test@test.com", "name", "pwd", "", 0, 0
        );
    }
    async get(email: string): Promise<IUser | null> {
        return null;
    }


}