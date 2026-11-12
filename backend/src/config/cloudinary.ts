//Esse código serve para conectar seu projeto ao Cloudinary
import { v2 as cloudinary} from "cloudinary"
/*AI VOCÊ PASSA :
cloud_name → nome da sua conta
api_key → seu usuário (identificação)
api_secret → sua senha (segura)
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
})

export default cloudinary;