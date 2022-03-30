const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// const HttpError = require('./models/http-error')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
async function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

   return await s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// // downloads a file from s3
//  function getFileStream(fileKey) {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName
//   }

     
//   let getimage = s3.getObject(downloadParams);
  
//   return getimage.createReadStream()
//   .on('end', ()=>{
//     console.log("stream completed")
//   }) 
//   .on('error',()=>{
//     throw new error
//   })

// }
// exports.getFileStream = getFileStream


async function deleteFile(path) {

  const uploadParams = {
    Bucket: bucketName,
    Key: path
  }

  return await s3.deleteObject(uploadParams).promise()
}
exports.deleteFile = deleteFile