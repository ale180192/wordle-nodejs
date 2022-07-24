export class User {
    _id: string;
    email: string
    password: string
    token: string
    gamesPlayed: number
    gamesWon: number

    constructor(email: string, password: string, token: string, gamesPlayed: number, gamesWon: number) {
        this.email = email
        this.password = password
        this.token = password
        this.gamesPlayed = gamesPlayed
        this.gamesWon = gamesWon
    }

}