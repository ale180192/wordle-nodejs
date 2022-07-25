import IUser from './user.model.interface';
import { Word } from './word.model';
import IWord from './word.model.interface';
export class Game {
    id: string;
    user: IUser;
    word: IWord | Word;
    ramainingAttempts: number;
    dateStart: string;
    won: boolean;

    constructor(user: IUser, word: Word, ramainingAttempts: number, dateStart: string, won: boolean) {
        this.user = user;
        this.word = word;
        this.ramainingAttempts = ramainingAttempts;
        this.dateStart = dateStart;
        this.won = won;
    }


}