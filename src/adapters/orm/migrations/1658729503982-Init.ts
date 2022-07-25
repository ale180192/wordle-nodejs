import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1658729503982 implements MigrationInterface {
    name = 'Init1658729503982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ramainingAttempts" integer NOT NULL, "won" boolean NOT NULL DEFAULT (0), "dateStart" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "wordId" integer, CONSTRAINT "UQ_35a35b385adf65bfc84b90131c4" UNIQUE ("userId", "wordId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "token" varchar NOT NULL, "gamesPlayed" integer NOT NULL, "gamesWon" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tiemesWasGuessed" integer NOT NULL, "available" boolean NOT NULL, CONSTRAINT "UQ_e52b1b51e9786565259dc56742b" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "word_intent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordReceived" varchar NOT NULL, "gameId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ramainingAttempts" integer NOT NULL, "won" boolean NOT NULL DEFAULT (0), "dateStart" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "wordId" integer, CONSTRAINT "UQ_35a35b385adf65bfc84b90131c4" UNIQUE ("userId", "wordId"), CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_89ce885a041fc1a7e54b19982f3" FOREIGN KEY ("wordId") REFERENCES "word" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_game"("id", "ramainingAttempts", "won", "dateStart", "userId", "wordId") SELECT "id", "ramainingAttempts", "won", "dateStart", "userId", "wordId" FROM "game"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`ALTER TABLE "temporary_game" RENAME TO "game"`);
        await queryRunner.query(`CREATE TABLE "temporary_word_intent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordReceived" varchar NOT NULL, "gameId" integer, CONSTRAINT "FK_585afdacf0713e75f327b0ac585" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_word_intent"("id", "wordReceived", "gameId") SELECT "id", "wordReceived", "gameId" FROM "word_intent"`);
        await queryRunner.query(`DROP TABLE "word_intent"`);
        await queryRunner.query(`ALTER TABLE "temporary_word_intent" RENAME TO "word_intent"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word_intent" RENAME TO "temporary_word_intent"`);
        await queryRunner.query(`CREATE TABLE "word_intent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "wordReceived" varchar NOT NULL, "gameId" integer)`);
        await queryRunner.query(`INSERT INTO "word_intent"("id", "wordReceived", "gameId") SELECT "id", "wordReceived", "gameId" FROM "temporary_word_intent"`);
        await queryRunner.query(`DROP TABLE "temporary_word_intent"`);
        await queryRunner.query(`ALTER TABLE "game" RENAME TO "temporary_game"`);
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ramainingAttempts" integer NOT NULL, "won" boolean NOT NULL DEFAULT (0), "dateStart" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "wordId" integer, CONSTRAINT "UQ_35a35b385adf65bfc84b90131c4" UNIQUE ("userId", "wordId"))`);
        await queryRunner.query(`INSERT INTO "game"("id", "ramainingAttempts", "won", "dateStart", "userId", "wordId") SELECT "id", "ramainingAttempts", "won", "dateStart", "userId", "wordId" FROM "temporary_game"`);
        await queryRunner.query(`DROP TABLE "temporary_game"`);
        await queryRunner.query(`DROP TABLE "word_intent"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
