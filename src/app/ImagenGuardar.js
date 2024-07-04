import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const guardarImage=(image)=>{
    if (!image) {
        return json({msg:'No se Envio imagen'});
      }
    
      // Procesar base64
      const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return json('Formato de imagen no válido');
      }
    
      const imageData = matches[2];
      const buffer = Buffer.from(imageData, 'base64');
      const imageExtension = path.extname( 'imagen.jpg');
      const imageName = `image_${Date.now()}${imageExtension}`;
      const imagePath = path.join(__dirname, 'uploads', imageName);
    
      // Crear la carpeta 'uploads' si no existe
      if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, 'uploads'));
      }
    
      // Guardar la imagen en el servidor
      fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
          console.error('Error al guardar la imagen:', err);
          return res.status(500).send('Error al guardar la imagen');
        }
    
        // Devolver la ruta de la imagen guardada
        return json({ path: imagePath });
      });
}