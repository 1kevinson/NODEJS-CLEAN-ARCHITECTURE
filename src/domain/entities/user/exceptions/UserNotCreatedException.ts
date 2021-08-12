export class UserNotCreatedException extends Error {
    constructor(private readonly statusCode: number, message: string) {
        super(message);
    };

    get status(): number {
        return this.statusCode;
    }
}