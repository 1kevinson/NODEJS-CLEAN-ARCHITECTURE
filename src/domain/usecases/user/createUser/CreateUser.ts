import { UserAlreadyExistsException } from '../../../entities/user/exceptions/UserAlreadyExistsException';
import { UserValidationException } from '../../../entities/user/exceptions/UserValidationException';
import { IdGenerator } from '../../../entities/user/ports/IdGenerator';
import { PasswordEncoder } from '../../../entities/user/ports/PasswordEncoder';
import { UserRepository } from '../../../entities/user/ports/UserRepository';
import { User } from '../../../entities/user/User';
import { UserValidator } from '../../../entities/user/validators/UserValidator';

export class CreateUser {

    constructor(
        private readonly repository: UserRepository,
        private readonly idGenerator: IdGenerator,
        private readonly passwordEncoder: PasswordEncoder) {
    }

    public async create(user: User): Promise<User> {
        if (!UserValidator.validateCreateUser(user)) {
            throw new UserValidationException(400, 'All user fields are not indicated!');
        }

        if (await this.userAlreadyExists(user)) {
            throw new UserAlreadyExistsException(409, `user with email ${user.email} already exists`);
        }

        const userToSave = new User(
            user.firstname,
            user.lastname,
            user.email,
            this.passwordEncoder.encode(user.password + user.email)
        );

        const createdUser = await this.repository.create(userToSave);

        return createdUser;
    }

    private async userAlreadyExists(user: User) {
        const users = await this.repository.findAllUsers();
        return users.find(u => u)?.email === user.email;
    }
}