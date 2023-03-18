const express = require("express")

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrl.getById);

router.post("/", auth, validation(joiSchema), ctrl.addContact);

router.put("/:id", validation(joiSchema), ctrl.updateContact);

router.patch("/:id/favorite", validation(statusJoiSchema), ctrl.updateStatusContact);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
