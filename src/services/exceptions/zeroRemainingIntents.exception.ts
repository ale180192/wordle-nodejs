
export default class ZeroRemainingIntentsException extends Error {

    constructor (message: string) {
        super(message);
        Object.setPrototypeOf(this, ZeroRemainingIntentsException.prototype);
    }
}