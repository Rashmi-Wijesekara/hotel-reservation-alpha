import { requestValidationMiddleware } from "@alpha-lib/shared-lib";
import { Router } from "express";
import { body } from "express-validator";

import { createRestaurent, deleteRestaurentType, getRestaurent } from "../controllers/restaurent-controller";

const router = Router();

router.get(
    "/",
    getRestaurent
);

router.post(
    "/",
    [
        body("restaurentType")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Restaurent Type required"),
        body("numberOfTables")
            .trim()
            .isInt({ gt: 0 })
            .withMessage("NumberOfTables required"),
        body("description")
            .trim()
            .not()
            .isEmpty()
            .withMessage("Description required"),
        body("imageURL")
            .trim()
            .isURL()
            .withMessage("Valid url required"),
        body("stars")
            .trim()
            .isInt({ gt: 0, max: 5 })
            .withMessage("stars should be 1 - 5"),
        body("tags")
            .isArray({ min: 1 })
            .withMessage("Should have at least 1 tag"),
        body("tags.*")
            .not()
            .isArray()
            .not()
            .isEmpty()
            .withMessage("tags should not be null"),
        body("maxGuest")
            .trim()
            .isInt({ gt: 0 })
            .withMessage("Number of Maximum Gurst required and should be grater than 0")
    ],
    requestValidationMiddleware,
    createRestaurent
);

router.delete(
    "/:restaurentTypeId",
    deleteRestaurentType
);

export { router as resturentRouter };