import { User } from "../User";

export interface UserRepository {

    create(user: User): User,

    findById(id: string): User | undefined;
    
    findByEmail(id: string): User | undefined;

    findAllUsers(): User[];
}