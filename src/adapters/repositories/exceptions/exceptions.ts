

export default class EmailAlreadyRegisteredException extends Error {
    constructor (message?: string) {
        if (!message) {
            message = "The email is already registered."
        }
        super(message);
    }
}