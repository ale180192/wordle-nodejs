import IUser from "./../../../domain/models/user.model.interface";
import { EntitySchema } from "typeorm"

export const UserEntity = new EntitySchema<IUser>({
    name: "user",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
        },
        token: {
            type: String,
        },
        gamesPlayed: {
            type: Number,
        },
        gamesWon: {
            type: Number,
        },
    },
    uniques: [
        {
          columns: ["email",]
        }
      ]
})