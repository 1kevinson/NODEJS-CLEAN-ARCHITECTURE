import { Sha256Encoder } from "./adapters/encoder/sha256-encoder/sha256-encoder";
import { UuidGenerator } from "./adapters/id-generator/uuid/UuidGenerator";
import { InMemoryUserRepository } from "./adapters/repository/InMemoryUserRepository";
import { UserService } from "./adapters/service/UserService";
import { User } from "./domain/entities/user/User";

const userService = new UserService(new InMemoryUserRepository(), new UuidGenerator(), new Sha256Encoder());
const userCreator = userService.createUser();

const user = userCreator.create(new User('HUV', 'Arsene', 'Kevin', 'kkouomeu', 'azerty77'));

user.then((data) => console.log(data));




