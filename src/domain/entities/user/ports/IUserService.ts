import { CreateUser } from '../../../usecases/user/createUser/CreateUser';
import { FindUser } from '../../../usecases/user/findUser/FindUser';

export interface IUserService {
    createUser(): CreateUser;

    findUser(): FindUser;
}