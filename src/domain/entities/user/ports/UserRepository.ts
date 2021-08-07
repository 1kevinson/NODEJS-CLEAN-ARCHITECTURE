import { User } from "../User";

export interface UserRepository {

    create(user: User): User | undefined;

    findById(id: string): User | undefined;
    
    findByEmail(email: string): User | undefined;

    findAllUsers(): User[];
}