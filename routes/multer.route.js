const express = require("express");
const { 
    uploadController,
    uploadMultipleController
} = require("../controllers/multer.controller");

const multerRouter = express.Router();

multerRouter.post("/", uploadController);
multerRouter.post("/multiple", uploadMultipleController);

module.exports = multerRouter;

