import IUser from './user.model.interface';
import IWord from './word.model.interface';
export class Game {
    _id: string;
    user: IUser;
    word: IWord;
    ramainingAttempts: number;

    constructor(user: IUser, word: IWord, ramainingAttempts: number) {
        this.user = user;
        this.word = word;
        this.ramainingAttempts = ramainingAttempts;
    }

}