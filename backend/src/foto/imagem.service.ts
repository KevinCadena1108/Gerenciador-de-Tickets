import { Injectable } from '@nestjs/common';


@Injectable()
export class ImagemService {
  saveImage(file: Express.Multer.File) {
    // Here you can add any additional logic if needed
    return { message: 'Image uploaded successfully', filename: file.filename };
  }
}