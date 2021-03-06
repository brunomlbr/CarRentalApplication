import { getRepository, Repository } from "typeorm";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

// import { Category } from "../../infra/typeorm/entities/Category";
// import {
//     ICategoriesRepository,
//     ICreateCategoryDTO,
// } from "../ICategoriesRepository";

// Singleton Pattern

class CategoriesRepository implements ICategoriesRepository {
    // private categories: Category[];
    private repository: Repository<Category>;
    // private static INSTANCE: CategoriesRepository;

    constructor() {
        // this.categories = [];
        this.repository = getRepository(Category);
    }
    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    // void = indica que não possui retorno
    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        // Select * from categories where name ="name" limit 1
        const category = await this.repository.findOne({ name });

        return category;
    }
}

export { CategoriesRepository };
