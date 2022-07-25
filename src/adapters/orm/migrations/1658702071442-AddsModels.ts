import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsModels1658702071442 implements MigrationInterface {
    name = 'AddsModels1658702071442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user" varchar NOT NULL, "word" varchar NOT NULL, "ramainingAttempts" integer NOT NULL, "userId" integer, "wordId" integer, CONSTRAINT "UQ_750dafbd54d133ec3e459ea8405" UNIQUE ("user", "word"))`);
        await queryRunner.query(`CREATE TABLE "word" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "tiemesWasGuessed" integer NOT NULL, "available" boolean NOT NULL, CONSTRAINT "UQ_e52b1b51e9786565259dc56742b" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "word_intent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "game" varchar NOT NULL, "wordReceived" varchar NOT NULL, "gameId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user" varchar NOT NULL, "word" varchar NOT NULL, "ramainingAttempts" integer NOT NULL, "userId" integer, "wordId" integer, CONSTRAINT "UQ_750dafbd54d133ec3e459ea8405" UNIQUE ("user", "word"), CONSTRAINT "FK_a8106c0a84d70ecfc3358301c54" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_89ce885a041fc1a7e54b19982f3" FOREIGN KEY ("wordId") REFERENCES "word" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_game"("id", "user", "word", "ramainingAttempts", "userId", "wordId") SELECT "id", "user", "word", "ramainingAttempts", "userId", "wordId" FROM "game"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`ALTER TABLE "temporary_game" RENAME TO "game"`);
        await queryRunner.query(`CREATE TABLE "temporary_word_intent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "game" varchar NOT NULL, "wordReceived" varchar NOT NULL, "gameId" integer, CONSTRAINT "FK_585afdacf0713e75f327b0ac585" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_word_intent"("id", "game", "wordReceived", "gameId") SELECT "id", "game", "wordReceived", "gameId" FROM "word_intent"`);
        await queryRunner.query(`DROP TABLE "word_intent"`);
        await queryRunner.query(`ALTER TABLE "temporary_word_intent" RENAME TO "word_intent"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "word_intent" RENAME TO "temporary_word_intent"`);
        await queryRunner.query(`CREATE TABLE "word_intent" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "game" varchar NOT NULL, "wordReceived" varchar NOT NULL, "gameId" integer)`);
        await queryRunner.query(`INSERT INTO "word_intent"("id", "game", "wordReceived", "gameId") SELECT "id", "game", "wordReceived", "gameId" FROM "temporary_word_intent"`);
        await queryRunner.query(`DROP TABLE "temporary_word_intent"`);
        await queryRunner.query(`ALTER TABLE "game" RENAME TO "temporary_game"`);
        await queryRunner.query(`CREATE TABLE "game" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user" varchar NOT NULL, "word" varchar NOT NULL, "ramainingAttempts" integer NOT NULL, "userId" integer, "wordId" integer, CONSTRAINT "UQ_750dafbd54d133ec3e459ea8405" UNIQUE ("user", "word"))`);
        await queryRunner.query(`INSERT INTO "game"("id", "user", "word", "ramainingAttempts", "userId", "wordId") SELECT "id", "user", "word", "ramainingAttempts", "userId", "wordId" FROM "temporary_game"`);
        await queryRunner.query(`DROP TABLE "temporary_game"`);
        await queryRunner.query(`DROP TABLE "word_intent"`);
        await queryRunner.query(`DROP TABLE "word"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
