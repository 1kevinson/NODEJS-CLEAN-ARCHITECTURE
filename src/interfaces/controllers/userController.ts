import { IUserService } from '../../domain/entities/user/ports/IUserService';
import express from 'express';
import { User } from '../../domain/entities/user/User';

export class UserController {

    constructor(private readonly userService: IUserService) {
    }

    createUser = async (req: express.Request, res: express.Response): Promise<any> => {
        const userCreator = this.userService.createUser();
        const id = req.body.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;

        try {
            await userCreator.create(new User(id, firstname, lastname, email, password)).then((result) => {
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
        } catch (e) {
            console.log(e.message);
        }
    };

    getUsers = async (req: express.Request, res: express.Response): Promise<any> => {
        const userFinder = this.userService.findUser();

        await userFinder.findAllUsers().then(result => {
            return res.status(200).json({
                data: result,
                message: 'Users Retrieved Successfully'
            });
        });
    };
}