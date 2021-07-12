import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
// import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  // Adicionar coluna avatar  na tabela users
  // Refatorar usuário com coluna avatar
  // Configuração upload multer
  // Criar regra de negócio do upload
  // Criar controller
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider // eslint-disable-next-line prettier/prettier
  ) { }
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }
    await this.storageProvider.save(avatar_file, "avatar");

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
