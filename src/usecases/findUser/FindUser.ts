import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";

export class FindUser {

    constructor(private readonly repository: UserRepository) { }

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