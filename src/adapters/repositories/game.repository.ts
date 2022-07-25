import IGameRepository from "./game.repository.interface";
import { UserSqlRepository } from "./user.repository";
import IGame from '../../domain/models/game.model.interface';
import IUser from '../../domain/models/user.model.interface';
import AppDataSource from '../../conf/dataSource';
import { GameEntity } from '../orm/schemas/game.schema';
import { WordEntity } from '../orm/schemas/word.schema';

import { Game } from '../../domain/models/game.model';
import { Word } from '../../domain/models/word.model';
import IWord from '../../domain/models/word.model.interface';
import { UserEntity } from "../orm/schemas/user.schema";

export default class GameSqlRepository implements IGameRepository {
    async save(word: string, userId: string): Promise<Game> {

        const repo = AppDataSource.getRepository(GameEntity);
        const wordOrm: IWord | null = await AppDataSource.getRepository(WordEntity).findOne({where: {name: word}});
        const userOrm: IUser | null = await AppDataSource.getRepository(UserEntity).findOne({where: {id: userId}}) ;
        try {
            const game = await repo.create();
            game.user = userOrm as IUser;
            game.ramainingAttempts = 5;
            game.word = wordOrm as IWord;
            game.ramainingAttempts = 5;
            const gameSaved = await repo.save(game) as Game;
            console.log("game...: ", game);
            return gameSaved;
        } catch (err) {
            console.log("Error to save gameRepo:");
            console.log(err);
            switch (err.code) {
                case 'SQLITE_CONSTRAINT':
                    throw new Error("err");
                default:
                    throw err;
            }
        }
    }

    async getWordById(id: string): Promise<Word | null> {

        const repo = AppDataSource.getRepository(WordEntity);
        const wordOrm = await AppDataSource.getRepository(WordEntity).findOne({where: {id}});
        return wordOrm;
    }

    async getGameById(id: string): Promise<Game> {

        const repo = AppDataSource.getRepository(GameEntity);
        const gameOrm = await AppDataSource
            .getRepository(GameEntity)
            .findOne({where: {id}, relations: ['user', 'word'],}  ) as Game;
        return gameOrm;
    }

    async updateGame(game: IGame): Promise<Game> {

        const repo = AppDataSource.getRepository(GameEntity);
        const gameOrm = await repo.save(game) as Game;
        return gameOrm;
    }

    async updateWord(word: IWord): Promise<Word> {

        const repo = AppDataSource.getRepository(WordEntity);
        const wordOrm = await repo.save(word) as Word;
        return wordOrm;
    }

    async getBestScores(): Promise<any> {


        const repo = AppDataSource.getRepository(GameEntity);
        const usersWon = await repo
            .createQueryBuilder('game')
            .select("Count(*)", "gamesWon")
            .addSelect("game.user")
            .where({won: true})
            .orderBy("gamesWon", "DESC")
            .groupBy("game.user")
            .limit(10)
            .getRawMany()
        console.log(usersWon);
        // [ { gamesWon: 7, userId: 1 }, { gamesWon: 2, userId: 4 } ]
        return usersWon;
    }

    async historyUsers(usersId: string[]): Promise<any> {


        const repo = AppDataSource.getRepository(GameEntity);
        const usersHistory: any = []
        for await (const userId of usersId) {
            console.log("user: ", userId);
            const userHistory = await repo
                .createQueryBuilder('game')
                .select("game.id")
                .addSelect("game.won")
                .addSelect("game.dateStart")
                .where({user: userId})
                .orderBy("game.dateStart", "DESC")
                .getRawMany()
            console.log("userhisto");
            console.log(userHistory);
            usersHistory.push({userId, userHistory})
        }
        return usersHistory;
    }

}
