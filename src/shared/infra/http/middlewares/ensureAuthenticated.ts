import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
// import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
// import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  // console.log(authHeader);

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      // "cfe275a5908b5650488e0b0342c2d6cc" mudou secret token para secret do refresh
      auth.secret_token
    ) as IPayload;

    // const usersRepository = new UsersRepository();
    // const user = usersRepository.findById(user_id);

    request.user = {
      id: user_id,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
