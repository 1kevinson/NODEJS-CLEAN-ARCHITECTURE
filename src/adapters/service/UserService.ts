import { IdGenerator } from "../../domain/entities/user/ports/IdGenerator";
import { IUserService } from "../../domain/entities/user/ports/IUserService";
import { PasswordEncoder } from "../../domain/entities/user/ports/PasswordEncoder";
import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { CreateUser } from "../../usecases/createUser/CreateUser";
import { FindUser } from "../../usecases/findUser/FindUser";

export class UserService implements IUserService {

    constructor(
        private readonly repository: UserRepository,
        private readonly idGenerator: IdGenerator,
        private readonly passwordEncoder: PasswordEncoder
    ) { }

    createUser(): CreateUser {
        return new CreateUser(this.repository, this.idGenerator, this.passwordEncoder);
    }

    findUser(): FindUser {
        return new FindUser(this.repository);
    }

}