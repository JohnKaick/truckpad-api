
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, './storage/')
    },
    filename: function (req, file, next) {
        next(null, Date.now() + '-' + file.originalname)
    }
})

module.exports = multer({ storage })