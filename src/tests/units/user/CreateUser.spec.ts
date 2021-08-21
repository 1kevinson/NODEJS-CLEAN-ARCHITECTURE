import { UserRepository } from '../../../domain/entities/user/ports/UserRepository';
import { anyOfClass, anyString, instance, mock, reset, verify, when } from 'ts-mockito';
import { InMemoryUserRepository } from '../../../adapters/repository/InMemoryUserRepository';
import { User } from '../../../domain/entities/user/User';
import { IdGenerator } from '../../../domain/entities/user/ports/IdGenerator';
import { UuidGenerator } from '../../../adapters/id-generator/uuid/UuidGenerator';
import { PasswordEncoder } from '../../../domain/entities/user/ports/PasswordEncoder';
import { Sha256Encoder } from '../../../adapters/encoder/sha256-encoder/sha256-encoder';
import { CreateUser } from '../../../domain/usecases/user/createUser/CreateUser';

let mockedUserRepository: UserRepository = mock(InMemoryUserRepository);
let mockedIdGenerator: IdGenerator = mock(UuidGenerator);
let mockedPasswordEncoder: PasswordEncoder = mock(Sha256Encoder);

let repository: UserRepository = instance(mockedUserRepository);
let idGenerator: IdGenerator = instance(mockedIdGenerator);
let passwordEncoder: PasswordEncoder = instance(mockedPasswordEncoder);

const userCreator = new CreateUser(repository, idGenerator, passwordEncoder);

const mockedUser = new User(idGenerator.generate(anyString()), 'Arsene', 'Kevin', 'kko@gmail.com', passwordEncoder.encode(anyString()));
const mockedUserArray: User[] = [];
mockedUserArray.push(
    new User(idGenerator.generate(anyString()), 'Arsene', 'Kevin', 'kkomo@gmail.com', passwordEncoder.encode(anyString())),
    new User(idGenerator.generate(anyString()), 'Arsene', 'Kevin', 'kkolo@gmail.com', passwordEncoder.encode(anyString()))
);

afterAll(() => {
    reset(mockedUserRepository);
});

describe('CREATE USER', () => {
    test('Should be able to create new User', async () => {
        when(mockedUserRepository.create(anyOfClass(User))).thenResolve(mockedUser);

        await expect(userCreator.create(new User('x', 'x', 'x', 'x', 'x'))).resolves.toBe(mockedUser);
        verify(mockedUserRepository.create(anyOfClass(User))).once();
    });

    test('Should throws an Error if some fields are missing', async () => {
        await expect(userCreator.create(new User('x', 'x', 'x', 'x', ''))).rejects.toThrowError('All user fields are not indicated!');
        verify(mockedUserRepository.create(anyOfClass(User))).once();
    });

    test('Should throw an error if user already exists', async () => {
        when(mockedUserRepository.findAllUsers()).thenResolve([mockedUserArray[1]]);

        await expect(userCreator.create(mockedUserArray[1])).rejects.toThrowError(
            `user with email ${mockedUserArray[1].email} already exists`
        );
    });
});