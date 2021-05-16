import { Router } from "express";
import multer from "multer";

// import { CategoriesRepository } from "../modules/cars/repositories/implementations/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
// import { PostgresCategoriesRepository } from "../repositories/PostgresCategoriesRepository";
// import { CreateCategoryService } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});
// const categories: Category[] = [];

// const categoriesRepository = new CategoriesRepository();
// qualquer subclasse pode ser usada neste repositorio
// const categoriesRepository = new PostgresCategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
