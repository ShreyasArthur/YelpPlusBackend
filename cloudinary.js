const cloudinary = require('cloudinary')
const fs = require('fs')

cloudinary.config({
    cloud_name: "dsk5glwyy",
    api_key: "217275532177363",
    api_secret: "LDkTcI7QX6BvBQCMTbI_9vATKKs"
})

exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result)=>{
            resolve({url: result.url, id: result.public_id})
        })
    })
}

exports.uploadImage = (req, res)=>{
    this.uploads(req.files[0].path)
    .then(function(result){
        console.log(result.url+" "+ result.id)
        fs.unlinkSync(req.files[0].path)
        res.send("ok")
    }) 
    .catch(err =>{
        console.log(err)
    })
}