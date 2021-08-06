export class User {

    constructor(
        private readonly _id: string,
        private readonly _firstname: string,
        private readonly _lastname: string,
        private readonly _email: string,
        private readonly _password: string,
    ) { }

    public get id(): string {
        return this._id;
    }

    public get password(): string {
        return this._password;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public get email(): string {
        return this._email;
    }

    public get lastname(): string {
        return this._lastname;
    }

}