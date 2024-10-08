import { Injectable } from '@nestjs/common';
import { CategoriaRepository } from 'src/repository/categoria.repository';

@Injectable()
export class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async getAll() {
    return await this.categoriaRepository.getAll();
  }
}
