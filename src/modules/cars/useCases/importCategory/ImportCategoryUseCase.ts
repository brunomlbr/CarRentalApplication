import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}
@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    // console.log(line);
                    // ["name", "description"]
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                // return categories;
                .on("end", () => {
                    // removendo file da pasta
                    fs.promises.unlink(file.path);

                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        // console.log(file);
        const categories = await this.loadCategories(file);
        // console.log(categories);

        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoriesRepository.findByName(
                name
            );

            if (!existCategory) {
                await this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
