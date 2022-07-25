import IGame from "./../../../domain/models/game.model.interface";
import { EntitySchema } from "typeorm"
import IWordIntent from "./../../../domain/models/wordIntent.model.interface";

export const WordIntentEntity = new EntitySchema<IWordIntent>({
    name: "wordIntent",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        wordReceived: {
            type: String,
        },
    },
    relations: {
        game: {
            target: 'game',
            type: 'many-to-one',
            joinColumn: true,
        },
    },
})