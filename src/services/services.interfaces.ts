
export interface IWordIntentResult {
    char: string;
    value: number;
}

export interface Intent {
    game: {word: string, ramainingAttempts: number, won: boolean},
    result: IWordIntentResult[]
}

export interface HistoryUser {
    userId: string;
    gamesPlayed: number,
    gamesWon: number
}


export interface Metrics {
    bestScores: {games_won: number, user_id: number},
    historyUser: HistoryUser[]
}