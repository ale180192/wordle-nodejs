export class Word {
    _id: string;
    name: string
    tiemesWasGuessed: number
    available: boolean

    constructor(name: string, tiemesWasGuessed: number, available: boolean) {
        this.name = name
        this.tiemesWasGuessed = tiemesWasGuessed
        this.available = available
    }

}