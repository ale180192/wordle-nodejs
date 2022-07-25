
export default class GameWonException extends Error {

    constructor (message: string) {
        super(message);
        Object.setPrototypeOf(this, GameWonException.prototype);
    }
}