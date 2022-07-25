import IGame from "./../../../domain/models/game.model.interface";
import { EntitySchema } from "typeorm"

export const GameEntity = new EntitySchema<IGame>({
    name: "game",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        user: {
            type: 'uuid',
        },
        word: {
            type: 'uuid',
        },
        ramainingAttempts: {
            type: Number,
        },
    },
    uniques: [
        {
          columns: ["user", "word",]
        }
    ],
    // relations: {
    //     user: {
    //         target: 'user',
    //         type: 'many-to-one',
    //         joinColumn: true,
    //     },
    //     word: {
    //         target: 'word',
    //         type: 'many-to-one',
    //         joinColumn: true,
    //     },
    // },
})