import { IdGenerator } from "../../domain/entities/user/ports/IdGenerator";
import { PasswordEncoder } from "../../domain/entities/user/ports/PasswordEncoder";
import { IUserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";

export class FindUser {

    constructor(private readonly repository: IUserRepository,
                private readonly idGenerator: IdGenerator,
                private readonly passwordEncoder: PasswordEncoder){}

    public findById(id: string): User | undefined {
        return this.repository.findById(id);
    }    

    public findAllUsers(): User[] {
        return this.repository.findAllUsers();
    }
}