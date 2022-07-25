import IGame from "./game.model.interface";

export default interface IWordIntent {
    id: string;
    game: IGame;
    wordReceived: string;
}