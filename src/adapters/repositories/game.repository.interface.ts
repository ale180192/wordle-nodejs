import IUser from '../../domain/models/user.model.interface';
import IGame from '../../domain/models/game.model.interface';

export default interface IGameRepository {

    save(word: string, user: IUser): Promise<IGame>;
}