import { UserRepository } from "../../../domain/entities/user/ports/UserRepository";
import { anyString, instance, mock, reset, verify, when } from 'ts-mockito'
import { InMemoryUserRepository } from "../../../adapters/repository/InMemoryUserRepository";
import { FindUser } from "../../../domain/usecases/user/findUser/FindUser";
import { User } from "../../../domain/entities/user/User";
import { UserNotFoundException } from "../../../domain/entities/user/exceptions/UserNotFoundException";

let mockedUserRepository: UserRepository = mock(InMemoryUserRepository);
let repository: UserRepository = instance(mockedUserRepository);

const userFinder = new FindUser(repository);
const mockedUser = new User(anyString(), 'Arsene', 'Kevin', 'kkouomeu@gmail.com', 'azerty77');
const mockedUsersList = [
    new User(anyString(), 'Arsene', 'Kevin', 'kkouomeu@gmail.com', 'azerty77'),
    new User(anyString(), 'Arsene', 'Kevin', 'kjouomeu@gmail.com', 'azerty57')
];

afterAll(() => {
    reset(mockedUserRepository);
});

describe('Test find methods on User', () => {
    describe('FIND USER BY ID', () => {
        test('Should be able to find user by his id', async () => {
            when(mockedUserRepository.findById(anyString())).thenResolve(mockedUser);

            await expect(userFinder.findById('test-id')).resolves.toBeInstanceOf(User);
            verify(mockedUserRepository.findById(anyString())).once();
        });

        test('Should throw an error if the user is not found by id', async () => {
            when(mockedUserRepository.findById('red')).thenReject(new UserNotFoundException('User Not found !'));

            await expect(userFinder.findById('red')).rejects.toThrowError('User Not found !');
            verify(mockedUserRepository.findById(anyString())).called();
        });

    });

    describe('FIND USER BY EMAIL', () => {
        test('Should be able to find user by his email', async () => {
            when(mockedUserRepository.findByEmail(anyString())).thenResolve(mockedUser);

            await expect(userFinder.findByEmail('kk@gm.fr')).resolves.toBeInstanceOf(User);
            verify(mockedUserRepository.findByEmail(anyString())).once();
        });

        test('Should throw an error if the user is not found by email', async () => {
            when(mockedUserRepository.findByEmail('kk@gmail.com')).thenReject(new UserNotFoundException('User Not found !'));

            await expect(userFinder.findByEmail('kk@gmail.com')).rejects.toThrowError('User Not found !');
            verify(mockedUserRepository.findByEmail(anyString())).called();
        });
    });

    describe('FIND ALL USERS', () => {
        test('Should be able to find all users', () => {
            when(mockedUserRepository.findAllUsers()).thenResolve(mockedUsersList);

            return userFinder.findAllUsers().then(data => {
                expect(data).toBeInstanceOf(Array);
                expect(data).toHaveLength(2);
                verify(mockedUserRepository.findAllUsers()).once();
            });
        });
    });
});