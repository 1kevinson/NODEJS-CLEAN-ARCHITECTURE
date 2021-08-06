import { IUser } from "./builder/IUser";

export class User {

    private readonly IUser: IUser;

    constructor() {
        this.IUser = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    firstname(firstname: string): User {
        this.IUser.firstname = firstname;
        return this;
    }

    lastname(lastname:string): User{
        this.IUser.lastname = lastname;
        return this;
    }

    email(email:string): User {
        this.IUser.email = email;
        return this;
    }

    password(password:string):User {
        this.IUser.password = password;
        return this;
    }

    build(): IUser {
        return this.IUser;
    }

    getName(): string {
        return this.IUser.firstname + this.IUser.lastname;
    }
}