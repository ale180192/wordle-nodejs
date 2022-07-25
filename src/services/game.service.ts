import IGameRepository from '../adapters/repositories/game.repository.interface';
import IGame from '../domain/models/game.model.interface';
import { Word } from '../domain/models/word.model';
import GameExpiredException from './exceptions/gameExpired.exception';
import * as _ from 'underscore';
import ZeroRemainingIntentsException from './exceptions/zeroRemainingIntents.exception';
import GameWonException from './exceptions/gameWon.exception';
import { Intent, IWordIntentResult, Metrics } from './services.interfaces';


export default class GameService {
    gameRepository: IGameRepository;

    constructor(gameRepository: IGameRepository) {
        this.gameRepository = gameRepository;
    }

    async create(userId: string): Promise<IGame> {
        const random = Math.floor(Math.random() * 12000) + 1
        const word = await this.gameRepository.getWordById(random.toString()) as Word;
        const game: IGame = await this.gameRepository.save(word.name, userId);
        return game;
    }

    async intentWord(word: string, gameId: string): Promise<Intent> {
        const random = Math.floor(Math.random() * 12000) + 1
        let game = await this.gameRepository.getGameById(gameId);
        if (game.won) {
            throw new GameWonException("You won, this game has finished.");
        }
        const currentMs = new Date().getTime();
        const minutesago5 = new Date(currentMs - (1000*60*5));
        const dateStart = new Date(game.dateStart);
        if (minutesago5.getTime() > dateStart.getTime() ) {
            throw new GameExpiredException("The game has expired.");
        }
        if (game.ramainingAttempts <= 0) {
            throw new ZeroRemainingIntentsException("You don't have more intents :c. please create a new game.");
        }
        const zipWords = _.zip(word, game.word.name);
        const intentResults: IWordIntentResult[] = []
        zipWords.forEach( (letter) => {
            let value = 3;
            if (letter[0] === letter[1]) {
                value = 1;
            } else if ( game.word.name.indexOf(letter[0]) !== -1) {
                value = 2
            }
            intentResults.push({char: letter[0], value})
        } );
        let won = false;
        if (game.word.name === word) {
            won = true
            game.word.tiemesWasGuessed += 1;
            const g = await this.gameRepository.updateWord(game.word);
            console.log("game: ..", g);
        }
        game.ramainingAttempts -= 1;
        game.won = won;
        game = await this.gameRepository.updateGame(game);
        return {
            game: {word: game.word.name, ramainingAttempts: game.ramainingAttempts, won},
            result: intentResults
        };
    }

   async metrics(): Promise<Metrics> {
    const bestScores = await this.gameRepository.getBestScores();
    const historyUsers = await this.gameRepository.historyUsers(["1", "2", "3"]);
    return {bestScores, historyUser: historyUsers}
   }
}