import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file), // pega o arquivo nesta pasta
      resolve(`${upload.tmpFolder}/${folder}`, file) // e coloca nesta pasta
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
