import { UserNotCreatedException } from "../../domain/entities/user/exceptions/UserNotCreatedException";
import { UserNotFoundException } from "../../domain/entities/user/exceptions/UserNotFoundException";
import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { User } from "../../domain/entities/user/User";
import { UuidGenerator } from "../id-generator/uuid/UuidGenerator";

export class InMemoryUserRepository implements UserRepository {

    private inMemoryDatas: User[] = [];

    async create(user: User): Promise<User> {
        this.inMemoryDatas.push(user);

        const insertedUser = new Promise<User>((resolve, reject) => {
            if (this.inMemoryDatas.indexOf(user) !== -1) {
                resolve(user)
            } else {
                reject(new UserNotCreatedException(`User with email: ${user.email} was not inserted in DB !`))
            }
        });

        return insertedUser;
    }

    async findById(id: string): Promise<User> {
        const searchedUser = this.inMemoryDatas.find(u => u.id === new UuidGenerator().generate(id));
        const foundedUser = new Promise<User>((resolve, reject) => {
            if (searchedUser !== undefined) {
                resolve(searchedUser);
            } else {
                reject(new UserNotFoundException(`User with id => ${id} was not found !`));
            }
        })
        return foundedUser;
    }

    async findByEmail(email: string): Promise<User> {
        const searchedUser = this.inMemoryDatas.find(u => u.email === email);
        const foundedUser = new Promise<User>((resolve, reject) => {
            if (searchedUser !== undefined) {
                resolve(searchedUser);
            } else {
                reject(new UserNotFoundException(`User with email => ${email} was not found !`));
            }
        })
        return foundedUser;
    }

    async findAllUsers(): Promise<User[]> {
        return [...this.inMemoryDatas];
    }

}