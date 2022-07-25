
export default class GameExpiredException extends Error {

    constructor (message: string) {
        super(message);
        Object.setPrototypeOf(this, GameExpiredException.prototype);
    }
}