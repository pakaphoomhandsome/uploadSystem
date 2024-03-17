const express = require("express");
const { 
    uploadController,
    uploadMultipleController
} = require("../controllers/multer.controller");


const { uploadIdCardController } = require("../controllers/idCard.controller");
const { uploadBookbankController } = require("../controllers/bookBank.controller");

const multerRouter = express.Router();

multerRouter.post("/", uploadController);
multerRouter.post("/multiple", uploadMultipleController);
multerRouter.post("/idCard", uploadIdCardController);
multerRouter.post("/bookBank", uploadBookbankController);

module.exports = multerRouter;

