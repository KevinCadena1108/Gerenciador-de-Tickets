import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteRepository } from 'src/repository/cliente.repository';

@Injectable()
export class ImagemService {
  constructor(private readonly clienteRespository: ClienteRepository) {}

  async saveImage(cpf: string, file: Express.Multer.File) {
    const cliente = await this.clienteRespository.findOne({ cpf: cpf });
    if (!cliente) throw new NotFoundException('O cliente não foi encontrado!');
    await this.clienteRespository.update({ imagem: file.path }, { cpf: cpf });
    return { message: 'Image uploaded successfully', filename: file.filename };
  }
}
