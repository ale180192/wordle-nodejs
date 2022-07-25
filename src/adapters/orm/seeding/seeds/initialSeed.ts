
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import AppDataSource from './../../../../conf/dataSource';
import { UserEntity } from './../../../../adapters/orm/schemas/user.schema';
import { WordEntity } from './../../../../adapters/orm/schemas/word.schema';

export default class CreateUsers {
  public async run(): Promise<any> {
    // the not encrypted pasword is secure
    const pwd = "$2b$10$/dYV.F3FR.WzwNFAmyWDe.pS3i49FzDAa.YmYQwFxE1nCA2OPBcBK"
    await AppDataSource.initialize()
    try {
        await AppDataSource
        .getRepository(UserEntity)
        .createQueryBuilder("User")
        .insert()
          .into(UserEntity)
          .values([
                {name: "alex", email: "alex1@test.com", password: pwd, token: "", gamesPlayed: 0, gamesWon: 0},
                {name: "alex", email: "alex2@test.com", password: pwd, token: "", gamesPlayed: 0, gamesWon: 0},
          ])
          .execute()
    } catch (error) {
        console.log("users already exist.");
    }
    try {

        const fileStream = fs.createReadStream(path.join(__dirname, 'words.txt'));
        const rl = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity
        });
        const words: any[] = [];
        for await (const line of rl) {
            if (line.length === 5) {
                words.push({name: line, tiemesWasGuessed: 0, available: true});
            }
        }
        await AppDataSource
        .getRepository(WordEntity)
        .createQueryBuilder("WordEntity")
        .insert()
          .into(WordEntity)
          .values(words)
          .execute()
        await AppDataSource.destroy();
    } catch (error) {
        console.log(error);
        console.log("words already exist.");
    }
  }
}

const inst = new CreateUsers()
inst.run()