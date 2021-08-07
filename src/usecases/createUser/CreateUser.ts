import { deepStrictEqual } from "assert";
import { UserAlreadyExistsException } from "../../domain/entities/user/exceptions/UserAlreadyExistsException";
import { UserValidationException } from "../../domain/entities/user/exceptions/UserValidationException";
import { IdGenerator } from "../../domain/entities/user/ports/IdGenerator";
import { PasswordEncoder } from "../../domain/entities/user/ports/PasswordEncoder";
import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";
import { UserValidator } from "../validators/UserValidator";

export class CreateUser {

    constructor(
        private readonly repository: UserRepository,
        private readonly idGenerator: IdGenerator,
        private readonly passwordEncoder: PasswordEncoder) { }

    public create(user: User): User {
        if (!UserValidator.validateCreateUser(user)) {
            throw new UserValidationException('All user fields are not indicated!');
        }

        deepStrictEqual(
            this.repository.findByEmail(user.email),
            user,
            new UserAlreadyExistsException(`user with email ${user.email} already exists`));

        var userTosave = new User(
            this.idGenerator.generate(user.id),
            user.firstname,
            user.lastname,
            user.email,
            this.passwordEncoder.encode(user.password + user.email)
        );

        return this.repository.create(userTosave);
    }

}