import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";

export class InMemoryRepository implements UserRepository {

    private readonly inMemoryDatas: User[] = [];

    create(user: User): User {
        this.inMemoryDatas.push(user);
        return user;
    }

    findById(id: string): User | undefined {
        return this.inMemoryDatas.find(u => u.id === id);
    }

    findByEmail(email: string): User | undefined {
        return this.inMemoryDatas.find(u => u.email === email);
    }

    findAllUsers(): User[] {
        return [...this.inMemoryDatas];
    }

}