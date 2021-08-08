import { User } from "../User";

export interface UserRepository {

    create(user: User): Promise<User>;

    findById(id: string): Promise<User>;
    
    findByEmail(email: string): Promise<User>;

    findAllUsers(): Promise<User[]>;
}