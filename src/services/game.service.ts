import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import IUser from '../domain/models/user.model.interface';
import IUserRepository from '../adapters/repositories/user.repository.interface';
import AuthException from './exceptions/auth.exception';
import IGameRepository from '../adapters/repositories/game.repository.interface';
import IGame from '../domain/models/game.model.interface';


export default class GameService {
    gameRepository: IGameRepository;

    constructor(gameRepository: IGameRepository) {
        this.gameRepository = gameRepository;
    }

    async create(word: string, user: IUser): Promise<IGame> {
        const game: IGame = await this.gameRepository.save(
            word, user
        );
        return game;
    }
}