import { UserRepository } from "../../../entities/user/ports/UserRepository";
import { User } from "../../../entities/user/User";

export class FindUser {

    constructor(private readonly repository: UserRepository) { }

    async findByEmail(email: string): Promise<User> {
        const foundedUser = await this.repository.findByEmail(email);
        return foundedUser;
    }

    async findAllUsers(): Promise<User[]> {
        const foundedListOfUser = await this.repository.findAllUsers();
        return foundedListOfUser;
    }
}
