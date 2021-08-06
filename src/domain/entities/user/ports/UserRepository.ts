import { User } from "../User";

export interface IUserRepository {

    create(user: User): User;

    findById(id: string): User | undefined;

    findAllUsers(): User[];
}