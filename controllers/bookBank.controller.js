const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, process.env.IMG_PATH_BOOKBANK);
    },
    filename: function (req, file, callback) {
      const originalname = file.originalname;
      const extension = path.extname(originalname);
      const basename = path.basename(originalname, extension);
      
      const uniqueFilename = `${basename}-${Date.now()}${extension}`;
      
      const filePath = path.join(process.env.IMG_PATH_BOOKBANK, uniqueFilename);
      if (fs.existsSync(filePath)) {
        callback(null, `${basename}-${Date.now()}${extension}`);
      } else {
        callback(null, uniqueFilename);
      }
    },
});

const upload = multer({ storage });

let nextImgId = 1;
const uploadBookbankController = async (req, res) => {
    try {
        upload.single('images')(req, res, async (err) => {

            let paths = [];
        
            if (err) {
                console.error('Error uploading file:', err);
                return res.json({ status: 'error', message: 'File upload failed' });
            }
        
            if (req.file) {
                const img_id = nextImgId++;
                const img_path = req.file.path;
                paths.push({ img_id, img_path });

                await prisma.upload.create({
                    data: {
                        path: paths
                    }
                });
        
                res.json(paths);
            } else {
                res.json({ status: 'error', message: 'No file uploaded' });
            }
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({'isError': true, err});
    }
}


module.exports = {
    uploadBookbankController
};
  

