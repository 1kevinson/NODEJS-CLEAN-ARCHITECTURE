import { User } from "../../domain/entities/user/User";

export class UserValidator {

    static validateCreateUser(user: User): boolean {
        return user.email !== '' && user.password !== '' && user.firstname !== '' && user.id !== '';
    }
}