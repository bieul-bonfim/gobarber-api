import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListUsersService from '@modules/users/services/ListUsersService';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
