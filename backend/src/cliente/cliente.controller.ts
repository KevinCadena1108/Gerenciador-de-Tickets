import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.createCliente(createClienteDto);
  }

  @Get()
  async getAll() {
    return await this.clienteService.getAll();
  }

  @Get('matricula/:matricula')
  async getByMatricula(@Param('matricula') matricula: string) {
    return await this.clienteService.getByMatricula(matricula);
  }

  @Get('cpf/:cpf')
  async getByCpf(@Param('id') cpf: string) {
    return await this.clienteService.getByCpf(cpf);
  }

  @Get('nome/:nome')
  async getByNome(@Param('nome') nome: string) {
    return await this.clienteService.getByNome(nome);
  }
}
