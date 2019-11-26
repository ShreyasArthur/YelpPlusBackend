var multer = require('multer')

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
            cb(null, "./images/")
        }else{
            cb({message: "Failed"}, false)
        }
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

module.exports = upload