import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider // eslint-disable-next-line prettier/prettier
  ) { }

  async execute(token: string): Promise<ITokenResponse> {
    //  validating and verifing received token
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    // delete old token
    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    // new refresh_token
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    // Gerar jsonwebtoken
    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token, // "1d"
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };
