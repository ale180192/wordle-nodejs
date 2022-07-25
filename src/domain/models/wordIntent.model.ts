import IGame from './game.model.interface';

export class WordIntent {
    id: string;
    game: IGame;
    wordReceived: string;

    constructor(game: IGame, wordReceived: string) {
        this.game = game;
        this.wordReceived = wordReceived;
    }

}