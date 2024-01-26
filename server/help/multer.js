const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../client/public/image')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    },
})

const upload = multer({ storage });

module.exports = upload