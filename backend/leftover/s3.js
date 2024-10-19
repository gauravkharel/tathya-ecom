const {S3Client, GetObjectCommand, PutObjectCommand } =  require("@aws-sdk/client-s3")
const {getSignedUrl} =  require("@aws-sdk/s3-request-presigner")

const s3Client = new S3Client({
    region: process.env.AWS_REGION ,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY
    }
  })


async function getObject(key){
    const command = new GetObjectCommand({
        Bucket: "tathyabucket",
        Key:key
    })
    const url = await getSignedUrl(s3Client, command)
    return url
}   

//even user and product name is also written here to get presigned url for uploads 
async function putObject(filename, contentType){
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME ,
        Key: `uploads/user-uploads/username/productname/${filename}`,
        ContentType: contentType
    })
    const url = await getSignedUrl(s3Client, command, {expiersIn: 120})
    return url
}

async function wow() {
    // console.log('url for 14.jpg', await getObject('3.png'))

    console.log('file upload ', await putObject('rara.jpg', 'image/jpeg' ))
}

wow()

