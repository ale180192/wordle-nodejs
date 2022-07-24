import IUser from '../../domain/models/user.model.interface';

export default interface IUserRepository {

    save(email: string, name: string, password: string, gamesPlayed: number, gamesWon: number): Promise<IUser>;
    update(user: IUser): Promise<IUser>;
    get(email: string): Promise<IUser | null>;
}