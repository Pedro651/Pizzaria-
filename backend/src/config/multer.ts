import multer from "multer";

// Usar o memoryStorage pra manter o arquivo em memoria e enviar diretamente para o cloudinary...
export default {
    // 👉 O arquivo fica na memória (RAM), não salva no disco
    // 👉 Usado quando você vai enviar depois para Cloudinary
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024, 
    // 👉 Limite de tamanho do arquivo
    // 👉 4MB máximo
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
    // 👉 Tipos de arquivo permitidos (imagens

    if (allowedMimes.includes(file.mimetype)) {
        // 👉 Se o arquivo for um desses tipos...
      cb(null, true);
       // 👉 aceita o arquivo (sem erro)
    } else {
      cb(new Error("Formato de arquivo invalido, use apenas JPG, JPEG, PNG."));
      // 👉 bloqueia o upload e retorna erro
    }
  },
};
