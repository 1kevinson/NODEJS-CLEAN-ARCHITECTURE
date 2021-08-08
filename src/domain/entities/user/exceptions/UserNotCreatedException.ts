export class UserNotCreatedException extends Error {
    constructor(message: string) {
        super(message);
    }
}