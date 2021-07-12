import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepositoru: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider // eslint-disable-next-line prettier/prettier
  ) { }

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepositoru.create(car_id, image);
      await this.storageProvider.save(image, "cars"); // => folder="cars"
    });
  }
}

export { UploadCarImagesUseCase };
