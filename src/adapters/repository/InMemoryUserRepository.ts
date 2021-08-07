import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";
import { UuidGenerator } from "../id-generator/uuid/UuidGenerator";

export class InMemoryUserRepository implements UserRepository {

    private inMemoryDatas: User[] = [];

    async create(user: User): Promise<User> {
        this.inMemoryDatas.push(user);
        return user;
    }

    findById(id: string): User | undefined {
        return this.inMemoryDatas.find(u => u.id === new UuidGenerator().generate(id));
    }

    findByEmail(email: string): User | undefined {
        return this.inMemoryDatas.find(u => u.email === email);
    }

    findAllUsers(): User[] {
        return this.inMemoryDatas;
    }

}