export class User {
    id: string;
    email: string
    name: string
    password: string
    token: string
    gamesPlayed: number
    gamesWon: number

    constructor( email: string, name: string, password: string, token: string, gamesPlayed: number, gamesWon: number, id?: string) {
        this.email = email
        this.name = name
        this.password = password
        this.token = password
        this.gamesPlayed = gamesPlayed
        this.gamesWon = gamesWon
    }


}