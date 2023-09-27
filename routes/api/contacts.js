const express = require('express');
const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId, authenticate} = require("../../middlewares");
const {schemas} = require("../../models/contact");

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put('/:id', authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
