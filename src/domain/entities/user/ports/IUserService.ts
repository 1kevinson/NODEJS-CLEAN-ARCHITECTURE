import { CreateUser } from "../../../../usecases/createUser/CreateUser";
import { FindUser } from "../../../../usecases/findUser/FindUser";

export interface IUserService {
    createUser(): CreateUser;

    findUser(): FindUser;
}