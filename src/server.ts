import { Sha256Encoder } from "./adapters/encoder/sha256-encoder/sha256-encoder";
import { UuidGenerator } from "./adapters/id-generator/uuid/UuidGenerator";
import { InMemoryUserRepository } from "./adapters/repository/InMemoryUserRepository";
import { UserService } from "./adapters/service/UserService";
import { User } from "./domain/entities/user/User";

const userService = new UserService(new InMemoryUserRepository(), new UuidGenerator(), new Sha256Encoder());
const userCreator = userService.createUser();

userCreator.create(new User('HUV','Arsene','Kevin','kkouomeu','azerty77'));
userCreator.create(new User('HUV','Arsene','Kevin','kkoduomeu','azerty77'));
userCreator.create(new User('HUV','Arsene','Kevin','kkoquomeu','azerty77'));

console.log(userService.findUser().findById('HUV'));
console.log(userService.findUser().findByEmail('kkouomeu'));
console.log(userService.findUser().findAllUsers());




