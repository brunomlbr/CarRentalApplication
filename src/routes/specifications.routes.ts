import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

// import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
// import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationsRoutes = Router();

// const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

export { specificationsRoutes };
