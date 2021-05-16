import { Category } from "../model/Category";
// esse arquivo é um contrato, é um sub tipo da classe
// DTO => Data transfer objetc
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
