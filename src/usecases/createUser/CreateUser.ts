import { IdGenerator } from "../../domain/entities/user/ports/IdGenerator";
import { PasswordEncoder } from "../../domain/entities/user/ports/PasswordEncoder";
import { IUserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";

export class CreateUser {

    constructor(private readonly repository: IUserRepository,
        private readonly idGenerator: IdGenerator,
        private readonly passwordEncoder: PasswordEncoder) { }

    public createUser(user: User): User {
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