import { User } from "../User";

export interface UserRepository {

    create(user: User): Promise<User>;

    findById(id: string): User | undefined;
    
    findByEmail(email: string): User | undefined;

    findAllUsers(): User[];
}