import { UserRepository } from "../../domain/entities/user/ports/UserRepository";
import { anyOfClass, anyString, instance, mock, reset, verify, when } from 'ts-mockito'
import { InMemoryUserRepository } from "../../adapters/repository/InMemoryUserRepository";
import { User } from "../../domain/entities/user/User";
import { IdGenerator } from "../../domain/entities/user/ports/IdGenerator";
import { UuidGenerator } from "../../adapters/id-generator/uuid/UuidGenerator";
import { PasswordEncoder } from "../../domain/entities/user/ports/PasswordEncoder";
import { Sha256Encoder } from "../../adapters/encoder/sha256-encoder/sha256-encoder";
import { CreateUser } from "./CreateUser";
import { UserAlreadyExistsException } from "../../domain/entities/user/exceptions/UserAlreadyExistsException";

let mockedUserRepository: UserRepository = mock(InMemoryUserRepository);
let mockedIdGenerator: IdGenerator = mock(UuidGenerator);
let mockedPasswordencoder: PasswordEncoder = mock(Sha256Encoder);

let repository: UserRepository = instance(mockedUserRepository);
let idGenerator: IdGenerator = instance(mockedIdGenerator);
let passwordEncoder: PasswordEncoder = instance(mockedPasswordencoder);

const userCreator = new CreateUser(repository, idGenerator, passwordEncoder);
const mockedUser = new User(
    idGenerator.generate(anyString()),
    'Arsene',
    'Kevin',
    'kko@gmail.com',
    passwordEncoder.encode(anyString()));

afterAll(() => {
    reset(mockedUserRepository);
});

describe('CREATE USER', () => {
    test('Should be able to create new User', async () => {
        when(mockedUserRepository.create(anyOfClass(User))).thenResolve(mockedUser);

        await expect(userCreator.create(new User('a', 'b', 'c', 'd', 'e'))).resolves.toBeInstanceOf(User);
        verify(mockedUserRepository.create(anyOfClass(User))).once();
    });

    test('Should throws an Error if some fields are missing', async () => {
        await expect(userCreator.create(new User('a', 'b', 'c', 'd', ''))).rejects.toThrowError('All user fields are not indicated!');
        verify(mockedUserRepository.create(anyOfClass(User))).once();
    });

    test('Should throws an error if the user already exists', async () => {
        when(mockedUserRepository.findByEmail(mockedUser.email)).thenResolve(mockedUser);
        when(mockedUserRepository.create(new User('a', 'b', 'c', mockedUser.email, 'e'))).thenResolve(mockedUser);

        await expect(userCreator.create(new User('a', 'b', 'c', mockedUser.email, 'e'))).rejects.toThrowError(`user with email ${mockedUser.email} already exists`);
        verify(mockedUserRepository.create(anyOfClass(User))).called();
    });
})