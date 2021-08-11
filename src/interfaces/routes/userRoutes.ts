import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../../adapters/service/UserService';
import { InMemoryUserRepository } from '../../adapters/repository/InMemoryUserRepository';
import { UuidGenerator } from '../../adapters/id-generator/uuid/UuidGenerator';
import { Sha256Encoder } from '../../adapters/encoder/sha256-encoder/sha256-encoder';

const router = Router();
const userController = new UserController(new UserService(
    new InMemoryUserRepository(),
    new UuidGenerator(),
    new Sha256Encoder()));

router.get('/', userController.getUsers);

router.post('/', userController.createUser);

export default router;