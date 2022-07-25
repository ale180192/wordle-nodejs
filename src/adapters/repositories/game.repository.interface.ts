import { Game } from '../../domain/models/game.model';
import { Word } from '../../domain/models/word.model';
import IGame from '../../domain/models/game.model.interface';
import IWord from '../../domain/models/word.model.interface';

export default interface IGameRepository {

    save(word: string, userId: string): Promise<Game>;
    getWordById(id: string): Promise<Word | null>;
    getGameById(id: string): Promise<Game>;
    updateGame(game: IGame): Promise<Game>;
    updateWord(word: IWord): Promise<Word>;
    getBestScores(): Promise<any>;
    historyUsers(usersId: string[]): Promise<any>;

}