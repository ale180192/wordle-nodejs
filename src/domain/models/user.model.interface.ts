export default interface IUser {
    id: string;
    name: string;
    password?: string;
    token?: string;
    email: string;
    gamesPlayed: number;
    gamesWon: number;
}