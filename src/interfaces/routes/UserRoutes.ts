import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../../adapters/service/UserService';
import { InMemoryUserRepository } from '../../adapters/repository/InMemoryUserRepository';
import { UuidGenerator } from '../../adapters/id-generator/uuid/UuidGenerator';
import { Sha256Encoder } from '../../adapters/encoder/sha256-encoder/sha256-encoder';
import { exceptionCatcher } from '../../infrastructure/utils/ExceptionCatcher';

const router = Router();
const userController = new UserController(new UserService(
    new InMemoryUserRepository(),
    new UuidGenerator(),
    new Sha256Encoder()));


router.get('/', exceptionCatcher(userController.getUsers));
router.get('/:userId', exceptionCatcher(userController.getUserById));

router.post('/', exceptionCatcher(userController.createUser));

export default router;