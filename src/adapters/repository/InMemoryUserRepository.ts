import { UserNotCreatedException } from '../../domain/entities/user/exceptions/UserNotCreatedException';
import { UserNotFoundException } from '../../domain/entities/user/exceptions/UserNotFoundException';
import { UserRepository } from '../../domain/entities/user/ports/UserRepository';
import { User } from '../../domain/entities/user/User';
import { UuidGenerator } from '../id-generator/uuid/UuidGenerator';

export class InMemoryUserRepository implements UserRepository {

    private inMemoryData: User[] = [];

    async create(user: User): Promise<User> {
        this.inMemoryData.push(user);

        return new Promise<User>((resolve, reject) => {
            if (this.inMemoryData.indexOf(user) !== -1) {
                resolve(user);
            } else {
                reject(new UserNotCreatedException(422,`User with email: ${user.email} was not inserted in DB !`));
            }
        });
    }

    async findById(id: string): Promise<User> {
        const searchedUser = this.inMemoryData.find(u => u.id === new UuidGenerator().generate(id));

        return new Promise<User>((resolve, reject) => {
            if (searchedUser !== undefined) {
                resolve(searchedUser);
            } else {
                reject(new UserNotFoundException(404,`User with id => ${id} was not found !`));
            }
        });
    }

    async findByEmail(email: string): Promise<User> {
        const searchedUser = this.inMemoryData.find(u => u.email === email);

        return new Promise<User>((resolve, reject) => {
            if (searchedUser !== undefined) {
                resolve(searchedUser);
            } else {
                reject(new UserNotFoundException(404,`User with email => ${email} was not found !`));
            }
        });
    }

    async findAllUsers(): Promise<User[]> {
        return new Promise<User[]>((resolve, reject) => {
            resolve([...this.inMemoryData])
        })
    }

}