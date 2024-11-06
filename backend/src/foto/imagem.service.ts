import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClienteRepository } from 'src/repository/cliente.repository';
import { createReadStream } from 'fs';

@Injectable()
export class ImagemService {
  constructor(
    private readonly clienteRespository: ClienteRepository,
    private readonly configService: ConfigService,
  ) {}

  async saveImage(cpf: string, file: Express.Multer.File) {
    const cliente = await this.clienteRespository.findOne({ cpf: cpf });
    if (!cliente) throw new NotFoundException('O cliente não foi encontrado!');
    await this.clienteRespository.update({ imagem: file.path }, { cpf: cpf });
    return { message: 'Image uploaded successfully', filename: file.filename };
  }

  async download(cpf: string) {
    const cliente = await this.clienteRespository.findOne({ cpf: cpf });
    if (!cliente) throw new NotFoundException('O cliente não foi encontrado!');
    if (!cliente.imagem) throw new NotFoundException('O cliente não possui imagem!');

    // TODO
    const file = createReadStream(cliente.imagem);
    return new StreamableFile(file);
  }
}
