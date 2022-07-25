import IUser from "./user.model.interface";
import IWord from "./word.model.interface";

export default interface IGame {
    id?: string;
    user: IUser;
    word: IWord;
    ramainingAttempts: number;
    won: boolean
    dateStart: string;
}