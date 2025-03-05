import { Router } from "express";
import { check } from "express-validator";
import { saveCategory, getCategories, getCategoryById, getProductsByCategory, deleteCategory, updateCategory } from "./category.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { existeCategoryById, existeCategoryByName } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        validarCampos
    ],
    saveCategory
)

router.get("/", getCategories)

router.get(
    "/findCategory/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "CLIENT_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos
    ],
    getCategoryById
)

router.get(
    "/findProductsByCategory/:name",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "CLIENT_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeCategoryByName),
        validarCampos
    ],
    getProductsByCategory
)

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos
    ],
    updateCategory
)

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN_ROLE"),
        check("id", "id invalid!").isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos
    ],
    deleteCategory
)

export default router;