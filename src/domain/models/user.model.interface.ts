export default interface IUser {
    id: number;
    name: string;
    password?: string;
    token?: string;
    email: string;
    gamesPlayed: number;
    gamesWon: number;
}