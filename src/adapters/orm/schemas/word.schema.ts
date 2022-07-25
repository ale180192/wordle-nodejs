import IWord from "./../../../domain/models/word.model.interface";
import { EntitySchema } from "typeorm"

export const WordEntity = new EntitySchema<IWord>({
    name: "word",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
        },
        tiemesWasGuessed: {
            type: Number,
        },
        available: {
            type: Boolean,
        },
    },
    uniques: [
        {
          columns: ["name",]
        }
      ]
})