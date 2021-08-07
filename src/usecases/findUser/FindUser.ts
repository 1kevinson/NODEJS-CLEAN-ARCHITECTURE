import { IdGenerator } from "../../domain/entities/user/ports/IdGenerator";
import { PasswordEncoder } from "../../domain/entities/user/ports/PasswordEncoder";
import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";

export class FindUser {

    constructor(
        private readonly repository: UserRepository,
        private readonly idGenerator: IdGenerator,
        private readonly passwordEncoder: PasswordEncoder) { }

    public findById(id: string): User | undefined {
        return this.repository.findById(id);
    }

    public findByEmail(email: string): User | undefined {
        return this.repository.findByEmail(email);
    }

    public findAllUsers(): User[] {
        return this.repository.findAllUsers();
    }
}