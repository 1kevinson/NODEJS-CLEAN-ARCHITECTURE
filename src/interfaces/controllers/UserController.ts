import { IUserService } from '../../domain/entities/user/ports/IUserService';
import express from 'express';
import { User } from '../../domain/entities/user/User';

export class UserController {

    constructor(private readonly userService: IUserService) {
    }

    private readonly userCreator = this.userService.createUser();
    private readonly userFinder = this.userService.findUser();

    createUser = async (req: express.Request, res: express.Response): Promise<any> => {
        const {firstname, lastname, email, password} = req.body;

        await this.userCreator.create(new User(firstname, lastname, email, password)).then((result) => {
            return res.status(201).json({
                message: 'Post successfully created !',
                post: {
                    id: result.id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    password: result.password
                }
            });
        });

    };

    getUsers = async (req: express.Request, res: express.Response): Promise<any> => {
        const users = await this.userFinder.findAllUsers();

        res.status(200).json({
            data: users,
            message: 'users successfully fetched'
        });
    };

    getUserByEmail = async (req: express.Request, res: express.Response): Promise<any> => {
        const user = await this.userFinder.findByEmail(req.params.userEmail);

        res.status(200).json({
            data: user,
            message: 'user successfully fetched'
        });
    };
}